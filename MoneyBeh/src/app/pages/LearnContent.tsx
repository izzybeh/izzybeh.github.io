import { useParams, Link, Navigate } from 'react-router';
import { Play, Pause, ArrowLeft, ArrowRight, BookOpen, Headphones } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getContentBySlug, getNextContent, getPreviousContent } from '../data/content';
import { AudioPlayer } from '../components/AudioPlayer';
import { updateSEO, addStructuredData } from '../utils/seo';

export function LearnContent() {
  const { slug } = useParams<{ slug: string }>();
  const [activeFormat, setActiveFormat] = useState<'read' | 'listen'>('read');

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!slug) {
    return <Navigate to="/articles" replace />;
  }

  const content = getContentBySlug(slug);

  if (!content) {
    return <Navigate to="/articles" replace />;
  }

  // Update SEO for this content
  useEffect(() => {
    if (content) {
      updateSEO({
        title: content.title,
        description: content.excerpt,
        keywords: `${content.category}, financial wellness, ${content.type === 'podcast' ? 'podcast episode' : 'financial article'}`,
        url: `https://moneybeh.com/learn/${content.slug}`,
        type: 'article',
        author: 'Izzy Beh',
        publishedTime: content.date,
      });

      // Add article/podcast episode schema
      const schema = {
        '@context': 'https://schema.org',
        '@type': content.type === 'podcast' ? 'PodcastEpisode' : 'Article',
        headline: content.title,
        description: content.excerpt,
        author: {
          '@type': 'Person',
          name: 'Izzy Beh',
        },
        datePublished: content.date,
        url: `https://moneybeh.com/learn/${content.slug}`,
        ...(content.type === 'podcast' && {
          episodeNumber: content.number,
          partOfSeries: {
            '@type': 'PodcastSeries',
            name: 'MoneyBeh Podcast',
            url: 'https://moneybeh.com/podcast',
          },
        }),
      };
      addStructuredData(schema);
    }
  }, [content]);

  const nextContent = getNextContent(content.id);
  const previousContent = getPreviousContent(content.id);

  return (
    <div className="min-h-screen">
      {/* Progress Bar */}
      <div className="bg-seafoam-50 border-b border-seafoam-200 py-3 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between text-sm text-warm-gray-700">
            <span className="text-seafoam-700">
              Episode {content.number} of 29
            </span>
            <span className="text-warm-gray-600">
              Part {content.part}: {content.partTitle}
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-warm-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <Link 
              to="/articles" 
              className="inline-flex items-center gap-2 text-seafoam-600 hover:text-seafoam-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Content
            </Link>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-warm-gray-600 flex-wrap">
              <span className="bg-seafoam-100 text-seafoam-700 px-3 py-1 rounded">
                {content.category}
              </span>
              <span>•</span>
              <span>{content.date}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight">
              {content.title}
            </h1>

            <p className="text-lg sm:text-xl text-warm-gray-700 leading-relaxed">
              {content.excerpt}
            </p>

            {/* Format Toggle */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setActiveFormat('read')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeFormat === 'read'
                    ? 'bg-seafoam-500 text-paper'
                    : 'bg-warm-gray-200 text-warm-gray-700 hover:bg-warm-gray-300'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Read ({content.readTime})
              </button>
              <button
                onClick={() => setActiveFormat('listen')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeFormat === 'listen'
                    ? 'bg-deep-teal-500 text-paper'
                    : 'bg-warm-gray-200 text-warm-gray-700 hover:bg-warm-gray-300'
                }`}
              >
                <Headphones className="w-4 h-4" />
                Listen ({content.duration})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Audio Player (when Listen is active) */}
      {activeFormat === 'listen' && (
        <section className="py-6 sm:py-8 px-4 sm:px-6 bg-deep-teal-50 border-y border-deep-teal-200">
          <div className="max-w-3xl mx-auto">
            <AudioPlayer
              audioUrl={content.audioUrl}
              title={content.title}
              duration={content.duration}
            />
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg max-w-none">
            <div 
              className="text-warm-gray-800 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ 
                __html: content.content
                  .split('\n')
                  .map(line => {
                    // Convert markdown-style headers
                    if (line.startsWith('# ')) {
                      return `<h1 class="text-3xl sm:text-4xl text-warm-gray-900 mb-6 mt-8">${line.slice(2)}</h1>`;
                    }
                    if (line.startsWith('## ')) {
                      return `<h2 class="text-2xl sm:text-3xl text-warm-gray-900 mb-4 mt-8">${line.slice(3)}</h2>`;
                    }
                    if (line.startsWith('### ')) {
                      return `<h3 class="text-xl sm:text-2xl text-seafoam-700 mb-3 mt-6">${line.slice(4)}</h3>`;
                    }
                    if (line.startsWith('---')) {
                      return `<hr class="my-8 border-warm-gray-200" />`;
                    }
                    if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
                      return `<p class="italic text-warm-gray-600 text-base my-4">${line.slice(1, -1)}</p>`;
                    }
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return `<p class="font-semibold text-warm-gray-900 my-3">${line.slice(2, -2)}</p>`;
                    }
                    if (line.trim() === '') {
                      return '';
                    }
                    // Regular paragraphs
                    return `<p class="text-base sm:text-lg leading-relaxed my-4">${line}</p>`;
                  })
                  .join('')
              }}
            />
          </article>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-warm-gray-50 border-t border-warm-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Previous */}
            {previousContent ? (
              <Link
                to={`/learn/${previousContent.slug}`}
                className="group border border-warm-gray-200 bg-paper rounded-lg p-5 hover:border-seafoam-500 transition-all"
              >
                <div className="flex items-start gap-3">
                  <ArrowLeft className="w-5 h-5 text-warm-gray-600 group-hover:text-seafoam-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-sm text-warm-gray-600 mb-1">Previous</div>
                    <div className="text-base sm:text-lg text-warm-gray-900 group-hover:text-seafoam-700 transition-colors">
                      {previousContent.title}
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div></div>
            )}

            {/* Next */}
            {nextContent && (
              <Link
                to={`/learn/${nextContent.slug}`}
                className="group border border-warm-gray-200 bg-paper rounded-lg p-5 hover:border-seafoam-500 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 text-right">
                    <div className="text-sm text-warm-gray-600 mb-1">Next</div>
                    <div className="text-base sm:text-lg text-warm-gray-900 group-hover:text-seafoam-700 transition-colors">
                      {nextContent.title}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-warm-gray-600 group-hover:text-seafoam-600 flex-shrink-0 mt-1" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}