import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-20">
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Welcome to LuminaVest</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Invest in mutual funds with ease. Discover, invest, and manage your portfolio all in one place.
          </p>
          <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <a href="/screener">Explore Funds</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="/register">Get Started</a>
              </Button>
            </div>
        </section>
      </main>
    </div>
  );
}
