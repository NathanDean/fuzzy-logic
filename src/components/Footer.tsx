import Link from "next/link"

export default function Footer () {

    return (

        <footer className="mt-auto py-4 px-6 dark:border-gray-700">

            <div className="flex justify-end">

                <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400">

                Privacy Policy

                </Link>

            </div>

        </footer>

    )

}