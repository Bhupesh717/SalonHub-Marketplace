import { Badge } from '@/components/ui/badge';

export function JSONHero() {
    return (
        <section className="w-full py-12 bg-gradient-to-b from-primary/5 to-transparent">
            <div className="container mx-auto px-4 text-center">
                <Badge variant="secondary" className="mb-4">
                    Free Tool • No Login Required
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-4xl mx-auto">
                    Online JSON Formatter, Validator & Beautifier
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                    Format, validate, and convert JSON instantly. Perfect for developers, students,
                    and testers who need to work with JSON data quickly and reliably.
                </p>

                <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                        ✓ Format & Beautify
                    </span>
                    <span className="flex items-center gap-2">
                        ✓ Validate Syntax
                    </span>
                    <span className="flex items-center gap-2">
                        ✓ Minify Code
                    </span>
                    <span className="flex items-center gap-2">
                        ✓ Convert to CSV/XML
                    </span>
                </div>
            </div>
        </section>
    );
}
