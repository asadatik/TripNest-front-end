export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-2">TripNest</h3>
            <p className="text-sm text-muted-foreground">
              Discover amazing travel packages and create unforgettable memories.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-foreground">
                  Home
                </a>
              </li>
              <li>
                <a href="/packages" className="hover:text-foreground">
                  Packages
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm text-muted-foreground">support@tripnest.com</p>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2025 TripNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
