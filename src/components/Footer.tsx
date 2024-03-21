import React from 'react';
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-white w-full p-6">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-semibold">About</h3>
                        <p className="mt-2">My personal tech blog, a space where I share my knowledge and passion for technology.</p>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-semibold">Links</h3>
                        <ul className="mt-2">
                            <li><Link href="/" className="text-blue-500 hover:text-blue-700">Home</Link></li>
                            <li><Link href="https://htetahyan.vercel.app" prefetch={false} target={'_blank'} className="text-blue-500 hover:text-blue-700">About</Link></li>

                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-semibold">Follow Me</h3>
                        <ul className="mt-2">
                            {social_links.map((link)=>{
                                return <li key={link.name}><a href={link.link} className="text-blue-500 hover:text-blue-700">{link.name}</a></li>
                            })}
                                    </ul>
                    </div>
                </div>
                <div className="mt-6 border-t border-gray-200 pt-6">
                    <p className="text-center text-gray-500">© 2024 Htet Ah Yan. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
const social_links = [
    {name:"Github",link:"https://github.com/htetahyan"},
    {name:"Facebook",link:"https://www.facebook.com/profile.php?id=100083336276167&mibextid=ZbWKwL"},
    {name:"LinkedIn",link:"https://linkedin.com/htet-ahyan"},
]