
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    CheckCircle2,
    XCircle,
    Copy,
    Download,
    Trash2,
    FileJson,
    Code,
    Minimize2,
    FileText,
    Table
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { jsonToCSV, jsonToXML } from '@/lib/converters';
import { Features } from '@/components/Features';
import { JSONHero } from '@/components/jsonHero';

export default function JsonFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const { toast } = useToast();

    const handleFormat = () => {
        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 2);
            setOutput(formatted);
            setError('');
            setIsValid(true);
            toast({
                title: 'Success!',
                description: 'JSON formatted successfully',
            });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Invalid JSON';
            setError(errorMessage);
            setIsValid(false);
            setOutput('');
        }
    };

    const handleMinify = () => {
        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            setOutput(minified);
            setError('');
            setIsValid(true);
            toast({
                title: 'Success!',
                description: 'JSON minified successfully',
            });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Invalid JSON';
            setError(errorMessage);
            setIsValid(false);
            setOutput('');
        }
    };

    const handleValidate = () => {
        try {
            JSON.parse(input);
            setError('');
            setIsValid(true);
            toast({
                title: 'Valid JSON!',
                description: 'Your JSON is properly formatted',
            });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Invalid JSON';
            setError(errorMessage);
            setIsValid(false);
        }
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
        setError('');
        setIsValid(null);
    };

    const handleCopy = () => {
        if (output) {
            navigator.clipboard.writeText(output);
            toast({
                title: 'Copied!',
                description: 'Output copied to clipboard',
            });
        }
    };

    const handleDownload = (format: 'json' | 'csv' | 'xml' = 'json') => {
        let content = '';
        let filename = '';
        let mimeType = '';

        try {
            const parsed = JSON.parse(input || output);

            switch (format) {
                case 'csv':
                    content = jsonToCSV(parsed);
                    filename = 'output.csv';
                    mimeType = 'text/csv';
                    break;
                case 'xml':
                    content = jsonToXML(parsed);
                    filename = 'output.xml';
                    mimeType = 'application/xml';
                    break;
                default:
                    content = JSON.stringify(parsed, null, 2);
                    filename = 'output.json';
                    mimeType = 'application/json';
            }

            const blob = new Blob([content], { type: mimeType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            toast({
                title: 'Downloaded!',
                description: `File saved as ${filename}`,
            });
        } catch (err) {
            toast({
                title: 'Error',
                description: 'Please provide valid JSON first',
                variant: 'destructive',
            });
        }
    };

    const handleConvert = (format: 'csv' | 'xml') => {
        try {
            const parsed = JSON.parse(input);
            let converted = '';

            if (format === 'csv') {
                converted = jsonToCSV(parsed);
            } else {
                converted = jsonToXML(parsed);
            }

            setOutput(converted);
            setError('');
            setIsValid(true);
            toast({
                title: 'Converted!',
                description: `JSON converted to ${format.toUpperCase()}`,
            });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Invalid JSON';
            setError(errorMessage);
            setIsValid(false);
        }
    };

    return (
        <>
            <JSONHero />
            <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
                {/* Status Badge */}
                {isValid !== null && (
                    <div className="flex justify-center animate-fade-in">
                        {isValid ? (
                            <Badge variant="outline" className="gap-2 bg-success/10 text-success border-success/20 px-4 py-2">
                                <CheckCircle2 className="h-4 w-4" />
                                Valid JSON
                            </Badge>
                        ) : (
                            <Badge variant="outline" className="gap-2 bg-destructive/10 text-destructive border-destructive/20 px-4 py-2">
                                <XCircle className="h-4 w-4" />
                                Invalid JSON
                            </Badge>
                        )}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 justify-center">
                    <Button onClick={handleFormat} className="gap-2">
                        <Code className="h-4 w-4" />
                        Format
                    </Button>
                    <Button onClick={handleValidate} variant="outline" className="gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Validate
                    </Button>
                    <Button onClick={handleMinify} variant="outline" className="gap-2">
                        <Minimize2 className="h-4 w-4" />
                        Minify
                    </Button>
                    <Button onClick={handleClear} variant="outline" className="gap-2">
                        <Trash2 className="h-4 w-4" />
                        Clear
                    </Button>
                </div>

                {/* Editors */}
                <div className="grid lg:grid-cols-2 gap-4">
                    {/* Input Panel */}
                    <Card className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <FileJson className="h-5 w-5 text-primary" />
                                Input JSON
                            </h3>
                        </div>
                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='Paste your JSON here...\n\nExample:\n{\n  "name": "John",\n  "age": 30\n}'
                            className="font-mono text-sm min-h-[400px] resize-none"
                        />
                    </Card>

                    {/* Output Panel */}
                    <Card className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" />
                                Output
                            </h3>
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleCopy}
                                    disabled={!output}
                                    size="sm"
                                    variant="ghost"
                                    className="gap-2"
                                >
                                    <Copy className="h-4 w-4" />
                                    Copy
                                </Button>
                                <Button
                                    onClick={() => handleDownload('json')}
                                    disabled={!output}
                                    size="sm"
                                    variant="ghost"
                                    className="gap-2"
                                >
                                    <Download className="h-4 w-4" />
                                    Download
                                </Button>
                            </div>
                        </div>
                        <Textarea
                            value={output}
                            readOnly
                            placeholder="Formatted output will appear here..."
                            className="font-mono text-sm min-h-[400px] resize-none bg-muted/50"
                        />
                    </Card>
                </div>

                {/* Error Display */}
                {error && (
                    <Card className="p-4 bg-destructive/10 border-destructive/20 animate-fade-in">
                        <div className="flex gap-3">
                            <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-destructive mb-1">JSON Error</h4>
                                <p className="text-sm text-destructive/90">{error}</p>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Conversion Options */}
                <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Convert JSON</h3>
                    <Tabs defaultValue="csv" className="w-full">
                        <TabsList className="grid w-full max-w-md grid-cols-2">
                            <TabsTrigger value="csv">CSV</TabsTrigger>
                            <TabsTrigger value="xml">XML</TabsTrigger>
                        </TabsList>
                        <TabsContent value="csv" className="space-y-3 pt-4">
                            <p className="text-sm text-muted-foreground">
                                Convert your JSON data to CSV format (comma-separated values)
                            </p>
                            <div className="flex gap-2">
                                <Button onClick={() => handleConvert('csv')} className="gap-2">
                                    <Table className="h-4 w-4" />
                                    Convert to CSV
                                </Button>
                                <Button
                                    onClick={() => handleDownload('csv')}
                                    variant="outline"
                                    className="gap-2"
                                >
                                    <Download className="h-4 w-4" />
                                    Download CSV
                                </Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="xml" className="space-y-3 pt-4">
                            <p className="text-sm text-muted-foreground">
                                Convert your JSON data to XML format (extensible markup language)
                            </p>
                            <div className="flex gap-2">
                                <Button onClick={() => handleConvert('xml')} className="gap-2">
                                    <Code className="h-4 w-4" />
                                    Convert to XML
                                </Button>
                                <Button
                                    onClick={() => handleDownload('xml')}
                                    variant="outline"
                                    className="gap-2"
                                >
                                    <Download className="h-4 w-4" />
                                    Download XML
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </Card>
            </div>
            <Features />
        </>
    );
}
