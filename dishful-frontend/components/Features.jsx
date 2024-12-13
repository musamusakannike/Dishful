import { Camera, Type, Sparkles, Clock, Users, Globe } from 'lucide-react'

const features = [
  {
    icon: Type,
    title: "Generate by Text",
    description: "Simply type in a food name or ingredients, and get a delicious recipe instantly."
  },
  {
    icon: Camera,
    title: "Generate by Image",
    description: "Upload a photo of ingredients or a dish, and we'll create a recipe for you."
  },
  {
    icon: Sparkles,
    title: "AI-Powered Suggestions",
    description: "Get personalized recipe recommendations based on your preferences and past choices."
  },
  {
    icon: Clock,
    title: "Quick and Easy",
    description: "Find recipes that match your available time, from quick snacks to elaborate meals."
  },
  {
    icon: Users,
    title: "Community Sharing",
    description: "Share your favorite recipes and discover new ones from our vibrant community."
  },
  {
    icon: Globe,
    title: "Global Cuisine",
    description: "Explore dishes from around the world and expand your culinary horizons."
  }
]

export default function Features() {
  return (
    <section className="py-20 bg-emerald-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-emerald-800 mb-12">
          Discover the Magic of Dishful
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <feature.icon className="w-12 h-12 text-emerald-500 mb-4" />
              <h3 className="text-xl font-semibold text-emerald-700 mb-2">{feature.title}</h3>
              <p className="text-emerald-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}