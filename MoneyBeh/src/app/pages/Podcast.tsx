import { Link } from 'react-router';
import { Clock, Calendar, Play, ChevronDown, ChevronUp } from 'lucide-react';
import { contentData } from '../data/content';
import { useEffect, useState } from 'react';
import { updateSEO, addStructuredData } from '../utils/seo';
import { useAudio } from '../contexts/AudioContext';

export function Podcast() {
  const { setCurrentlyPlaying } = useAudio();
  const [expandedPart, setExpandedPart] = useState<number | null>(1);

  useEffect(() => {
    updateSEO({
      title: 'Podcast - Stories of Financial Freedom',
      description: 'Listen to real stories and insights on building sustainable financial freedom. Learn about budgeting, saving, and achieving financial independence through our podcast episodes.',
      keywords: 'financial podcast, money podcast, financial freedom podcast, personal finance, financial wellness, budgeting podcast',
      url: 'https://moneybeh.com/podcast',
      type: 'website',
    });

    // Add structured data for podcast page
    const podcastSeries = {
      '@context': 'https://schema.org',
      '@type': 'PodcastSeries',
      name: 'MoneyBeh Podcast',
      description: 'Stories and insights on building sustainable financial freedom',
      url: 'https://moneybeh.com/podcast',
      author: {
        '@type': 'Organization',
        name: 'MoneyBeh',
      },
    };
    addStructuredData(podcastSeries);
  }, []);

  const podcastEpisodes = contentData;

  // Podcast parts structure
  const podcastParts = [
    { id: 1, title: 'The Foundations of Financial Independence' },
    { id: 2, title: 'Powering Up Your Journey: Investing & Optimizing' },
    { id: 3, title: 'Advanced Strategies & Life Design' },
    { id: 4, title: 'Living Your FI Life' },
  ];

  const getContentByPart = (partId: number) => {
    return podcastEpisodes.filter(episode => episode.part === partId);
  };

  const togglePart = (partId: number) => {
    setExpandedPart(expandedPart === partId ? null : partId);
  };

  return (
    <div className="min-h-screen">
      {/* Header - Mobile First */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-deep-teal-50 border-b border-deep-teal-200">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 sm:gap-8">
            {/* Podcast Cover - Mobile Optimized */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-deep-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
              <Play className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-paper fill-paper" />
            </div>

            <div className="space-y-4 text-center sm:text-left flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight">
                The MoneyBeh Podcast
              </h1>
              <p className="text-lg sm:text-xl text-warm-gray-700 leading-relaxed max-w-2xl">
                Your complete roadmap to Financial Independence. 29 episodes guiding you from foundation to freedom—no jargon, just clear steps and honest insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <button
                  onClick={() => podcastEpisodes[0] && setCurrentlyPlaying(podcastEpisodes[0])}
                  className="bg-deep-teal-500 hover:bg-deep-teal-600 active:bg-deep-teal-700 text-paper px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-paper" />
                  Start Episode 0
                </button>
                <button className="border border-deep-teal-500 text-deep-teal-600 hover:bg-deep-teal-50 active:bg-deep-teal-100 px-6 py-3 rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episode Parts - Expandable */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          {podcastParts.map((part) => {
            const episodes = getContentByPart(part.id);
            
            return (
              <div key={part.id} className="border border-warm-gray-200 rounded-lg overflow-hidden">
                {/* Part Header - Clickable */}
                <button
                  onClick={() => togglePart(part.id)}
                  className="w-full bg-warm-gray-100 hover:bg-warm-gray-200 active:bg-warm-gray-300 transition-colors p-5 sm:p-6 flex items-center justify-between"
                >
                  <div className="text-left flex-1">
                    <div className="text-deep-teal-600 text-sm mb-1">Part {part.id}</div>
                    <h2 className="text-xl sm:text-2xl text-warm-gray-900 mb-2 leading-tight">
                      {part.title}
                    </h2>
                    <p className="text-sm sm:text-base text-warm-gray-700">
                      {episodes.length} episodes
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {expandedPart === part.id ? (
                      <ChevronUp className="w-6 h-6 text-warm-gray-600" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-warm-gray-600" />
                    )}
                  </div>
                </button>

                {/* Episodes List */}
                {expandedPart === part.id && (
                  <div className="bg-paper divide-y divide-warm-gray-200">
                    {episodes.map((episode) => (
                      <div
                        key={episode.id}
                        className="p-5 sm:p-6 hover:bg-deep-teal-50 transition-colors group"
                      >
                        <div className="flex items-start gap-4 sm:gap-6">
                          {/* Play Button - Stops propagation */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentlyPlaying(episode);
                            }}
                            className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 bg-deep-teal-500 hover:bg-deep-teal-600 active:bg-deep-teal-700 rounded-full flex items-center justify-center transition-all hover:scale-105 touch-manipulation"
                            aria-label={`Play ${episode.title}`}
                          >
                            <Play className="w-5 h-5 sm:w-6 sm:h-6 text-paper fill-paper ml-0.5" />
                          </button>

                          {/* Episode Info - Clickable to article */}
                          <Link 
                            to={`/learn/${episode.slug}`}
                            className="flex-1 min-w-0 space-y-2 sm:space-y-3"
                          >
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-warm-gray-600 flex-wrap">
                              <span className="text-deep-teal-600 font-medium">
                                Episode {episode.number}
                              </span>
                              <span className="hidden sm:inline">•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                {episode.duration}
                              </span>
                            </div>
                            <h3 className="text-lg sm:text-xl text-warm-gray-900 group-hover:text-deep-teal-600 transition-colors leading-tight">
                              {episode.title}
                            </h3>
                            <p className="text-warm-gray-700 text-sm sm:text-base leading-relaxed">
                              {episode.excerpt}
                            </p>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-seafoam-50 border-t border-seafoam-200">
        <div className="max-w-3xl mx-auto text-center space-y-5 sm:space-y-6">
          <h2 className="text-3xl sm:text-4xl text-warm-gray-900 leading-tight">
            Ready to Start Your FI Journey?
          </h2>
          <p className="text-lg sm:text-xl text-warm-gray-700 leading-relaxed">
            Begin with Episode 0 and follow the complete roadmap to financial independence.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
            <button
              onClick={() => podcastEpisodes[0] && setCurrentlyPlaying(podcastEpisodes[0])}
              className="bg-seafoam-500 hover:bg-seafoam-600 active:bg-seafoam-700 text-paper px-8 py-4 rounded-lg transition-colors w-full sm:w-auto text-base sm:text-lg flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-paper" />
              Listen to Episode 0
            </button>
            <button className="bg-deep-teal-500 hover:bg-deep-teal-600 active:bg-deep-teal-700 text-paper px-8 py-4 rounded-lg transition-colors w-full sm:w-auto text-base sm:text-lg">
              Download the App
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}