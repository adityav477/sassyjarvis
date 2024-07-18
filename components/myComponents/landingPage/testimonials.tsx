"use client"
import React from 'react'
import TestimonialCard from './testimonialCard'

const testimonials = [
  {
    "name": "Somiya",
    "testimony": "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    "description": "Software Engineer"
  },
  {
    "name": "Mihir",
    "testimony": "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    "description": "Software Engineer"
  },
  {
    "name": "Namita",
    "testimony": "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    "description": "Software Engineer"
  },
  {
    "name": "Habibi",
    "testimony": "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    "description": "Software Engineer"
  },
]

function Testimonials() {
  return (
    <div className='mx-auto text-center py-10'>
      <div className='texxt-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white '>
        Testimonials
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-4 mt-8'>
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.name} name={testimonial.name} testimony={testimonial.testimony} description={testimonial.description} />
        ))}
      </div>
    </div>
  )
}

export default Testimonials
