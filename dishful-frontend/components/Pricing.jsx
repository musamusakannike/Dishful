import * as React from 'react';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'Perfect for casual cooks',
    features: [
      '10 AI-generated recipes per month',
      'Basic recipe search',
      'Save up to 20 favorite recipes',
      'Access to community recipes',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$9.99/month',
    description: 'Ideal for food enthusiasts',
    features: [
      'Unlimited AI-generated recipes',
      'Advanced recipe search and filters',
      'Unlimited favorite recipes',
      'Personalized recipe recommendations',
      'Meal planning tool',
      'Ad-free experience',
    ],
    cta: 'Go Pro',
    popular: true,
  },
  {
    name: 'Chef',
    price: '$19.99/month',
    description: 'For culinary professionals',
    features: [
      'All Pro features',
      'AI-powered recipe scaling and conversion',
      'Nutritional analysis for all recipes',
      'Custom recipe creation tools',
      'Priority customer support',
      'Early access to new features',
    ],
    cta: 'Become a Chef',
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-emerald-800 mb-4">
          Choose Your Culinary Journey
        </h2>
        <p className="text-xl text-center text-emerald-600 mb-12">
          Select the plan that best suits your cooking aspirations
        </p>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col rounded-lg border p-6 shadow-sm transition-all ${
                plan.popular
                  ? 'border-emerald-500 shadow-lg transform scale-105'
                  : 'border-gray-200'
              }`}
            >
              {/* Card Header */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-emerald-700">
                  {plan.name}
                </h3>
                <p className="text-emerald-600">{plan.description}</p>
              </div>

              {/* Card Content */}
              <div className="flex-grow mb-6">
                <p className="text-4xl font-bold text-emerald-800 mb-6">
                  {plan.price}
                </p>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-emerald-700"
                    >
                      <Check className="h-5 w-5 text-emerald-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer */}
              <div>
                <button
                  className={`w-full py-3 text-lg font-semibold rounded-md transition-colors ${
                    plan.popular
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
