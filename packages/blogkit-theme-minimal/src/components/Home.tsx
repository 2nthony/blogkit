import type { HomePageProps, Post } from 'blogkit'
import { Container } from './Container'
import { Footer } from './Footer'
import Link from 'next/link'
import Head from 'next/head'
import { date } from '../date'

export function Home({ posts, siteConfig }: HomePageProps) {
  return (
    <Container>
      <Head>
        <title>{siteConfig.title}</title>
      </Head>

      <h1 className="text-4xl font-extrabold">{siteConfig.title}</h1>

      <div className="mt-16 mb-12">
        <ul className="pl-0">
          {posts.map((post) => {
            return <PostItem key={post.attributes.slug} post={post} />
          })}
        </ul>
      </div>

      <div className="my-16">
        <Footer />
      </div>
    </Container>
  )
}

function PostItem({ post }: { post: Post }) {
  return (
    <li className="post-item my-6 list-none pl-0">
      <h3 className="text-2xl font-bold mb-2">
        <Link href={'/' + post.attributes.slug}>
          <a className="hover:underline no-underline cursor-pointer">
            {post.attributes.title}
          </a>
        </Link>
      </h3>

      {post.attributes.description && (
        <p className="text-slate-500 mb-2">{post.attributes.description}</p>
      )}
      <time className="text-slate-400 text-sm">
        {date(post.attributes.date)}
      </time>
    </li>
  )
}
