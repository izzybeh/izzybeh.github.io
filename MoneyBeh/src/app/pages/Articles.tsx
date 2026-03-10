import { Link } from 'react-router';
import { Clock, Calendar, Headphones } from 'lucide-react';
import { contentData } from '../data/content';
import { useEffect } from 'react';
import { updateSEO, addStructuredData } from '../utils/seo';

export function Articles() {
  useEffect(() => {
    updateSEO({
      title: 'Articles - Financial Wellness Roadmap',
      description: 'Learn the roadmap to financial wellness through clear, jargon-free articles. Build your Joy Fund, create your Safety Net, and plan your path to financial freedom.',
      keywords: 'financial wellness articles, budgeting tips, emergency fund guide, debt payoff, financial independence, money management',
      url: 'https://moneybeh.com/articles',
      type: 'website',
    });

    // Add structured data for articles page
    const articleList = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'MoneyBeh Articles',
      description: 'Financial wellness articles and guides',
      url: 'https://moneybeh.com/articles',
    };
    addStructuredData(articleList);
  }, []);

  const categories = [
    { name: 'All', slug: 'all', active: true },
    { name: 'Getting Started', slug: 'getting-started' },
    { name: 'Growth', slug: 'growth' },
    { name: 'Safety', slug: 'safety' },
    { name: 'Spending', slug: 'spending' }
  ];

  const featuredContent = contentData.filter(item => item.id <= 2);
  const regularContent = contentData.filter(item => item.id > 2);

  return (
    <div className="min-h-screen">
      {/* Header - Mobile First */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-warm-gray-50 border-b border-warm-gray-200">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-4 leading-tight">
            Articles
          </h1>
          <p className="text-lg sm:text-xl text-warm-gray-700 max-w-2xl mx-auto leading-relaxed">
            Your roadmap to financial wellness, one clear step at a time
          </p>
        </div>
      </section>

      {/* Categories - Mobile First */}
      <section className="py-4 sm:py-6 px-4 sm:px-6 bg-paper border-b border-warm-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.slug}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors text-sm sm:text-base flex-shrink-0 ${
                  category.active
                    ? 'bg-seafoam-500 text-paper'
                    : 'bg-warm-gray-100 text-warm-gray-700 active:bg-warm-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles - Mobile First */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl text-warm-gray-900 mb-6 sm:mb-8">
            Featured
          </h2>
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2">
            {featuredContent.map((article) => (
              <Link
                key={article.id}
                to={`/learn/${article.slug}`}
                className="group block bg-seafoam-50 border border-seafoam-200 rounded-lg p-6 sm:p-8 hover:border-seafoam-500 active:border-seafoam-600 transition-all"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-seafoam-700 flex-wrap">
                    <span className="bg-seafoam-100 px-2 py-1 rounded">{article.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      {article.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Headphones className="w-3 h-3 sm:w-4 sm:h-4" />
                      {article.duration}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl text-warm-gray-900 group-hover:text-seafoam-700 transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-warm-gray-700 text-sm sm:text-base leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-warm-gray-600 pt-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    {article.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles - Mobile First */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl text-warm-gray-900 mb-6 sm:mb-8">
            Recent Articles
          </h2>
          <div className="space-y-4 sm:space-y-6">
            {regularContent.slice(0, 4).map((article) => (
              <Link
                key={article.id}
                to={`/learn/${article.slug}`}
                className="group block bg-paper border border-warm-gray-200 rounded-lg p-5 sm:p-6 hover:border-seafoam-500 active:border-seafoam-600 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-warm-gray-600 flex-wrap">
                    <span className="bg-warm-gray-100 px-2 py-1 rounded text-warm-gray-700">{article.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      {article.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Headphones className="w-3 h-3 sm:w-4 sm:h-4" />
                      {article.duration}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl text-warm-gray-900 group-hover:text-seafoam-700 transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-warm-gray-700 text-sm sm:text-base leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-warm-gray-600">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    {article.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}