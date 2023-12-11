import Link from 'next/link';

const Nav = () => {

  return (
    <div className="bg-blue-600 text-white p-4 ">
      <nav className="container mx-auto flex items-center justify-between">
          <a href="/" className="text-lg font-semibold">Study</a>
          <a href="/manage-cards" className="text-lg font-semibold">Manage Cards</a>
      </nav>
    </div>
  )
}

export default Nav