import { Card } from '@/components/ui/card';
import {
    CheckCircle2,
    Code,
    Minimize2,
    Copy,
    Download,
    Table,
    FileCode,
    Zap
} from 'lucide-react';

const features = [
    {
        icon: Code,
        title: 'Format & Beautify',
        description: 'Instantly format messy JSON with proper indentation and structure',
    },
    {
        icon: CheckCircle2,
        title: 'Validate JSON',
        description: 'Check if your JSON is valid with clear error messages and line numbers',
    },
    {
        icon: Minimize2,
        title: 'Minify JSON',
        description: 'Remove all whitespace to reduce file size for production use',
    },
    {
        icon: Copy,
        title: 'One-Click Copy',
        description: 'Copy formatted JSON to your clipboard instantly',
    },
    {
        icon: Download,
        title: 'Download Files',
        description: 'Save your formatted JSON as .json, .csv, or .xml files',
    },
    {
        icon: Table,
        title: 'Convert to CSV',
        description: 'Transform JSON data into CSV format for spreadsheets',
    },
    {
        icon: FileCode,
        title: 'Convert to XML',
        description: 'Convert JSON to XML format with proper structure',
    },
    {
        icon: Zap,
        title: 'Fast & Free',
        description: 'No registration required. Process JSON instantly in your browser',
    },
];

export function Features() {
    return (
        <section className="w-full py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-3">
                        Powerful JSON Tools
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to work with JSON data - format, validate, convert, and more
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="p-6 hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <feature.icon className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">
                                {feature.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
