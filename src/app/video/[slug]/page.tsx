import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Play, Clock, Calendar, Youtube, Facebook, Twitter } from 'lucide-react';

import { getVideoBySlug, getVideoSlugs, getVideos } from '@/lib/server/videos';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getVideoSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = await getVideoBySlug(slug);

  if (!video) {
    return {
      title: 'Video không tồn tại | Nội Thất Tuấn Vương',
    };
  }

  return {
    title: `${video.title} | Nội Thất Tuấn Vương`,
    description: video.description,
    keywords: [video.category.toLowerCase(), 'video nội thất', 'review nội thất'],
    alternates: {
      canonical: `https://noithattuanvuong.vn/video/${slug}`,
    },
    openGraph: {
      title: video.title,
      description: video.description,
      url: `https://noithattuanvuong.vn/video/${slug}`,
      siteName: 'Nội Thất Tuấn Vương',
      type: 'video.other',
      images: [video.thumbnailUrl || '/images/og-videos.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: video.title,
      description: video.description,
      images: [video.thumbnailUrl || '/images/og-videos.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default async function VideoDetailPage({ params }: Props) {
  const { slug } = await params;
  const video = await getVideoBySlug(slug);

  if (!video) {
    notFound();
  }

  const allVideos = await getVideos();
  const relatedVideos = allVideos
    .filter((v) => v.id !== video.id)
    .slice(0, 4);

  return (
    <>
        {/* Breadcrumb */}
        <section className="py-4 bg-gray-50 border-b">
          <div className="container">
            <nav>
              <ol className="flex items-center gap-2 text-sm text-gray-500">
                <li>
                  <Link href="/" className="hover:text-accent">Trang chủ</Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/video" className="hover:text-accent">Video</Link>
                </li>
                <li>/</li>
                <li className="text-primary font-medium line-clamp-1">{video.title}</li>
              </ol>
            </nav>
          </div>
        </section>

        {/* Video Player */}
        <section className="py-8 bg-black">
          <div className="container max-w-5xl">
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                width="100%"
                height="100%"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* Video Info */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="container max-w-5xl">
            <header className="mb-8">
              <span className="text-sm text-accent font-medium uppercase tracking-wider">
                {video.category}
              </span>
              <h1 className="text-2xl lg:text-3xl font-bold text-primary mt-2 mb-4">
                {video.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {video.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {new Date(video.publishedAt).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </header>

            {/* Description */}
            <div className="prose prose-lg max-w-none mb-8">
              <p>{video.description}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-8 border-t">
              <a 
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white! font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                <Youtube size={18} />
                Xem trên YouTube
              </a>
              
              <div className="flex gap-2">
                <a 
                  href="#" 
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white! hover:opacity-90 transition-opacity"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white! hover:opacity-90 transition-opacity"
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Videos */}
        {relatedVideos.length > 0 && (
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                  Video Liên Quan
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedVideos.map((relatedVideo) => (
                  <Link
                    key={relatedVideo.id}
                    href={`/video/${relatedVideo.slug}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      {relatedVideo.youtubeId ? (
                        <Image
                          src={`https://img.youtube.com/vi/${relatedVideo.youtubeId}/maxresdefault.jpg`}
                          alt={relatedVideo.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="25vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 text-white! ml-0.5" />
                        </div>
                      </div>
                      {relatedVideo.duration && (
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white! text-xs rounded">
                          {relatedVideo.duration}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-primary group-hover:text-accent transition-colors line-clamp-2">
                        {relatedVideo.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back Link */}
        <section className="py-8 bg-white">
          <div className="container">
            <Link 
              href="/video"
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
            >
              <ArrowLeft size={18} />
              Quay lại danh sách video
            </Link>
          </div>
        </section>
      </>
  );
}
