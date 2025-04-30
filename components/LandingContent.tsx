"use client"

import {Card, CardContent, CardHeader, CardTitle} from "./ui/card"

const LandingContent = () => {
    const testimonial = [
        {
          name: "Shivam",
          avatar: "S",
          title: "Software Engineer",
          description: "This is the best application I've used!"
        },
        {
          name: "Aarav Mehta",
          avatar: "A",
          title: "Product Manager",
          description: "Intuitive UI and seamless performance. It’s now an essential part of my workflow!"
        },
        {
          name: "Neha Sharma",
          avatar: "N",
          title: "UX Designer",
          description: "Clean, responsive, and beautifully designed. Absolutely love using it every day."
        },
        {
          name: "Rohit Khanna",
          avatar: "R",
          title: "Full Stack Developer",
          description: "The features are well thought out and incredibly helpful. A must-have tool for devs."
        },
        {
          name: "Priya Verma",
          avatar: "P",
          title: "Marketing Analyst",
          description: "Helped me boost productivity and manage my tasks more effectively. Great experience!"
        },
        {
          name: "Ankit Desai",
          avatar: "A",
          title: "Startup Founder",
          description: "This app has transformed how our team collaborates and tracks goals. Highly recommend it!"
        }
      ];
      
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:gridcols-3 lg:grid-cols-4 gap-4">
            {
                testimonial.map((item) => (
                    <Card key={item.description} className="bg-[#102339] border-none text-white">
                       <CardHeader>
                          <CardTitle className="flex items-center gap-x-2">
                              <div>
                                <p className="text-lg">{item.name}</p>
                                <p className="text-zinc-400 text-sm">{item.title}</p>
                              </div>
                          </CardTitle>
                          <CardContent className="pt-4 px-0">
                            {item.description}
                          </CardContent>
                       </CardHeader>
                    </Card>
                ))
            }
      </div>
    </div>
  )
}

export default LandingContent
