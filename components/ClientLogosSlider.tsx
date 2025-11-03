"use client"

import Image from "next/image"
import InfiniteScroll from "./infinite-scroll"


const companies = [
  { name: "Microsoft", logo: "/Company/1.png" },
  { name: "Google", logo: "/Company/2.png" },
  { name: "Apple", logo: "/Company/3.png" },
  { name: "Amazon", logo: "/Company/4.png" },
  { name: "Meta", logo: "/Company/5.png" },
  { name: "Netflix", logo: "/Company/6.png" },
  { name: "Tesla", logo: "/Company/7.png" },

]

export default function LogoMarquee() {
  const logoElements = companies.map((company, index) => (
    <div
      key={`${company.name}-${index}`}
      className="flex items-center justify-center px-5 py-2 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 min-w-[200px]"
    >
      <div className="">
        <Image
          src={company.logo || "/placeholder.svg"}
          alt={`${company.name} logo`}
          width={140}
          height={60}
          className="h-12 w-full object-cover"
        />
      </div>
    </div>
  ))

  return (
    <section className="py-16 bg-gray-50">
      <div className="container  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by leading schools worldwide</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Join the growing community of schools that trust our platform to transform education through technology.
          </p>
        </div>

        {/* First row - scrolling left */}
        <div className="mb-8">
          <InfiniteScroll direction="left" speed="normal" pauseOnHover={true}>
            {logoElements}
          </InfiniteScroll>
        </div>

        {/* Second row - scrolling right */}
        <div className="mb-8">
          <InfiniteScroll direction="right" speed="slow" pauseOnHover={true}>
            {logoElements.slice().reverse()}
          </InfiniteScroll>
        </div>

        {/* Third row - scrolling left fast */}
        {/* <InfiniteScroll direction="left" speed="fast" pauseOnHover={true}>
          {logoElements}
        </InfiniteScroll> */}
      </div>
    </section>
  )
}
