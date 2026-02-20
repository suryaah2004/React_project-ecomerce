import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { Link } from 'react-router-dom'
import AllProducts from '../components/UiAllProducts';


function Home() {

    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setFadeIn(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className="relative">
                
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                        backgroundImage:
                            "url('')",
                        height: "85vh",
                    }}

                >
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                </div>

          
                <Navbar />

                <div className="container mx-auto px-6 pt-12 pb-48 relative z-10">
                    <div
                        className={`max-w-3xl transition-all duration-1000 ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            }`}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                            Where Imaginations <br /> Come to Life
                        </h1>
                        <p className="text-xl text-white mb-8 md:pr-12">
                            Premium vinyl playsets designed for endless adventures, built to last for generations of fun.
                        </p>

                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <div className='flex justify-end p-6'>
                  
                    <a
                        href="/products"
                        className="bg-transparent border-2 border-black text-black hover:bg-white hover:text-gray-900 font-bold py-3 px-8 rounded-lg transition transform hover:-translate-y-1 inline-flex items-center justify-center"
                   
                    >
                        <span>Explore More</span>
                        <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
                <AllProducts limit={13} />



            </div>



            <div className="py-20 bg-white" id="features">
                <div className="container mx-auto px-6">
                 
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Why Families Choose SwingIt
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our premium playsets are designed with both children and parents in mind.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                       
                        <div className="text-center p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105">
                            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center 
            bg-yellow-100 text-yellow-500 rounded-full text-3xl">
                                <i className="fas fa-medal"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
                            <p className="text-gray-600">
                                Durable vinyl construction that withstands years of active play without fading,
                                splintering, or requiring maintenance.
                            </p>
                        </div>

                    
                        <div className="text-center p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105">
                            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center 
            bg-blue-100 text-blue-500 rounded-full text-3xl">
                                <i className="fas fa-paint-brush"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Custom Designs</h3>
                            <p className="text-gray-600">
                                Create a personalized playset that fits your space, budget,
                                and your children's unique play preferences.
                            </p>
                        </div>

                     
                        <div className="text-center p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105">
                            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center 
            bg-green-100 text-green-500 rounded-full text-3xl">
                                <i className="fas fa-shield-alt"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Safety First</h3>
                            <p className="text-gray-600">
                                Built with rounded edges, secure connections, and premium materials
                                that meet rigorous safety standards.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
            <div>

            </div>

        </>
    )
}

export default Home
