import React from "react";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react"
import Link from "next/link";

interface FooterProps { }

export const Footer: React.FC<FooterProps> = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center gap-2 font-bold text-lg mb-4">
                            <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center text-primary font-bold">
                                SFS
                            </div>
                            <span>School for Schools</span>
                        </div>
                        <p className="text-sm opacity-90">Transforming education through innovative technology solutions.</p>
                        <div className="mt-5">
                            {/* Social Links */}
                            <div className="flex justify-left gap-6">
                                <a href="#" className="hover:opacity-80 transition-opacity text-white hover:text-gray-400" aria-label="LinkedIn">
                                    <Linkedin size={20} />
                                </a>
                                <a href="#" className="hover:opacity-80 transition-opacity text-white hover:text-gray-400" aria-label="Twitter">
                                    <Twitter size={20} />
                                </a>
                                <a href="#" className="hover:opacity-80 transition-opacity text-white hover:text-gray-400" aria-label="Facebook">
                                    <Facebook size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="hover:opacity-80 transition-opacity text-white hover:text-gray-400">
                                    Home
                                </Link>
                            </li>                            
                            
                            <li>
                                <Link href="/about" className="hover:opacity-80 transition-opacity text-white hover:text-gray-400">
                                    About Us
                                </Link>
                            </li>   
                            <li>
                                <Link href="/contact" className="hover:opacity-80 transition-opacity text-white hover:text-gray-400">
                                    Contact Us
                                </Link>
                            </li>                        
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h3 className="font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/salons" className="hover:opacity-80 transition-opacity text-white hover:text-gray-400">
                                    Salons
                                </Link>
                            </li>                    
                            <li>
                                <Link href="/services" className="hover:opacity-80 transition-opacity text-white hover:text-gray-400">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:opacity-80 transition-opacity text-white hover:text-gray-400">
                                    Blog & Articles
                                </Link>
                            </li>   
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold mb-4">Contact</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <Mail size={16} />
                                <a href="mailto:info@schoolforschools.com" className="hover:opacity-80 transition-opacity text-white hover:text-gray-400">
                                    info@schoolforschools.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone size={16} />
                                <a href="tel:+1234567890" className="hover:opacity-80 transition-opacity text-white hover:text-gray-400">
                                    +1 (234) 567-890
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin size={16} className="mt-0.5" />
                                <span>123 Education Street, Tech City, TC 12345</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-90">
                    <p className="text-white">&copy; {currentYear} <strong>School for Schools</strong>. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/privacy-policy" className="hover:opacity-80 transition-opacity text-white hover:text-gray-400">
                            Privacy Policy
                        </Link>
                        <Link href="/terms-conditions" className="hover:opacity-80 transition-opacity text-white hover:text-gray-400">
                            Terms of Use
                        </Link>
                        <Link href="/refund-policy" className="hover:opacity-80 transition-opacity text-white hover:text-gray-400">
                            Refund Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}