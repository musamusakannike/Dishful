'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Home Cook",
    testimonial: "Dishful has revolutionized my cooking! I love how it generates recipes from the ingredients I have on hand."
  },
  {
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Food Blogger",
    testimonial: "As a food blogger, Dishful is my secret weapon. It helps me create unique recipes that my followers love!"
  },
  {
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Busy Parent",
    testimonial: "Dishful saves me so much time! I can quickly generate healthy recipes for my family, even on busy weeknights."
  },
  {
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Culinary Student",
    testimonial: "The AI-powered suggestions in Dishful have expanded my culinary knowledge. It's like having a personal mentor!"
  },
  {
    name: "Lisa Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Health Enthusiast",
    testimonial: "I love how Dishful helps me stick to my dietary goals while still enjoying delicious, varied meals."
  }
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-emerald-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-emerald-800 mb-12">
          What Our Users Say
        </h2>
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{
              x: ['0%', '-100%']
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <Card key={index} className="flex-shrink-0 w-[300px] mx-4 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-emerald-800">{testimonial.name}</h3>
                      <p className="text-sm text-emerald-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-emerald-700">{testimonial.testimonial}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}