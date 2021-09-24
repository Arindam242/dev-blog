import Head from "next/head";
import {PrismaClient} from "@prisma/client";
import Link from "next/link";
import moment from 'moment';

const prisma = new PrismaClient();

export default function Home({Posts}) {
    console.log( moment.utc("2021-09-24T14:37:50.731Z").format("DD/MM"));
    return (
        <div className="flex flex-col  min-h-screen">
            <Head>
                <title>Dev Blog</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <header className="w-full h-16 bg-black flex items-center justify-between">
                <h2 className="text-2xl font-medium text-white mx-10">Dev Blog</h2>
                <Link href="/Create">
                    <span className="px-4 py-2 bg-red-600 text-white mx-10">Create</span>
                </Link>
            </header>
            <main className="w-full my-5 max-w-7xl mx-auto">
                {Posts.map((post, i) => (
                    <div
                        key={post.id}
                        className="w-full p-10 cursor-pointer hover:translate-y-5 h-auto rounded-md shadow-lg hover:shadow-2xl transition-all space-y-3"
                    >
                        <h2 className="text-2xl font-medium">{post.title}</h2>
                        <p className="text-gray-600">{post.content}</p>
                        <div>

                            <p className="text-gray-900">{Posts[i].author.name}</p>
                            <p className={"text-gray-400"}>{ moment.utc(post.createdAt).format("MMM Do , yyy")}</p>
                        </div>

                    </div>
                ))}
            </main>
        </div>
    );
}

export async function getServerSideProps() {
    const Posts = await prisma.post.findMany({
        include: {
            author: true,
        },
    });
    return {
        props: {
            Posts: Posts,
        },
    };
}
