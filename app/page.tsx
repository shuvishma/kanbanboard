"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ArrowRight, BarChart, Calendar, ChevronRight, Layout } from "lucide-react";
import Link from "next/link";
import CompanyCarousal from '../components/company-carousal';
import faqs from '@/data/faqs.json';

const features = [
  {
    icon: Layout,
    title: "Intuitive Kanban Boards",
    description: "Visualize your workflow and optimize team productivity with our easy-to-use Kanban Boards",
  },
  {
    icon: Calendar,
    title: "Powerful Sprint Planning",
    description: "Paln and manage sprints effectively, ensuring your team stays focused on delivering value",
  },
  {
    icon: BarChart,
    title: "Comprehensive Reporting",
    description: "Gain insight into your team's performance with detailed, customizable reports and analytics",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto py-20 text-center">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold gradient-title pb-6 flex flex-col">
          Streamline Your Workflow <br />
          <span className="flex mx-auto gap-3 sm:gap-4 items-center">
            with {" "} <span className="bg-blue-200 text-black p-4 border rounded-lg">KANBAN BOARD</span>
          </span>
        </h1>

        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">Empower your team with our intuitive project management solution</p>

        <Link href='/onboarding'>
          <Button size="lg" className="mr-4">
            Get Started <ChevronRight size={18} />
          </Button>
        </Link>
        <Link href='#features'>
          <Button size="lg" variant={"outline"} className="mr-4">
            Learn More
          </Button>
        </Link>
      </section>

      <section id="features" className="bg-gray-900 py-20 px-5">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Key Features</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              return (
                <Card key={index} className="bg-gray-800">
                  <CardContent className="pt-6">
                    <feature.icon className="h-12 w-12 mb-4 text-blue-300" />
                    <h4 className="text-xl text-blue-300 font-semibold mb-2">{feature.title}</h4>
                    <p className="text-gray-200">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Trusted by Industry Leaders</h3>
          <CompanyCarousal />
        </div>
      </section>

      <section className="vbg-gray-900 py-20 px-5">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="w-full">
            {
              faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${faq.question}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))
            }text-xl mb-12
          </Accordion>
        </div>
      </section>

      <section className="py-20 text-center px-5">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-6">Ready to Transform your Workflow?</h3>
          <p className="text-xl mb-12">Join thousands of team already using kanban board to streamline their projects and boost productivity</p>
          <Link href='/onboarding'>
          <Button size='lg' className="animate-bounce">
            Start for free <ArrowRight className="ml-2 h-5 w-5"/>
          </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}