import Link from 'next/link'
import type { PostPageProps } from 'blogkit'
import { Footer } from './Footer'
import { Container } from './Container'
import Head from 'next/head'

export function Post({ post, siteConfig }: PostPageProps) {
  if (!post) {
    return null
  }

  return (
    <Container>
      <Head>
        <title>
          {post.attributes.title} - {siteConfig.title}
        </title>
      </Head>

      <div className="text-lg my-8 font-semibold">
        <Link href="/">{siteConfig.title}</Link>
      </div>

      <h1 className="text-4xl font-extrabold mb-4">{post.attributes.title}</h1>

      <div>
        <time className="text-slate-400">{post.attributes.date}</time>
      </div>

      <article
        className="post-body"
        dangerouslySetInnerHTML={{ __html: post.html || '' }}
      ></article>

      <div className="my-16">
        <Footer />
      </div>
    </Container>
  )
}
