import Link from "next/link"

export default function Footer () {

    return (

        <footer className="mt-auto py-4 px-6 dark:border-gray-700">

            <div className="flex justify-end space-x-4">

                <Link href="/privacy" className = "text-sm text-gray-600 dark:text-gray-400">

                Privacy Policy

                </Link>

                <Link href = "/cookies" className = "text-sm text-gray-600 dark:text-gray-400">
                
                Cookie usage
                
                </Link>

            </div>

        </footer>

    )

}