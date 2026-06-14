import React from 'react';
import { Award, Users, Code, Globe, Shield, BookOpen, Target, Rss } from 'lucide-react';

const AboutUs = () => {
  const features = [
    {
      icon: Users,
      title: 'Our Vision',
      description: 'A movement that aims to bring science and economic development to all sections of society with the essence of free software.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Target,
      title: 'Our Mission',
      description: "Let's bring the concept of free software to all the people of our country. Use and encouraging the improvement of free software in industry and academia.",
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: Globe,
      title: 'Major Aims',
      description: 'Creating awareness on GNU/Linux Operating System and Free Software. Delivering various flavors of Linux for those in need around Vilupuram.',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10'
    },
    {
      icon: BookOpen,
      title: 'What we are Doing?',
      description: 'Conducting open week-end tech meetups to equip rural youth with coding and analytical skills through FOSS technologies.',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    }
  ];

  const contributions = [
    {
      title: 'Sangailakkiyam',
      desc: 'An android application used to read all literature from the Sangam era.',
      icon: BookOpen
    },
    {
      title: 'Mozilla Localization',
      desc: 'Enriched Mozilla and its products into Tamil localization.',
      icon: Globe
    },
    {
      title: 'Spell4Wiki',
      desc: 'Eminent resource for Wikipedia where people can give voice samples for words. Acts as a Wiki-Dictionary.',
      icon: Rss
    },
    {
      title: 'VizhiTamilApp',
      desc: 'Helps visually impaired people listen to Tamil Books using image to text technology.',
      icon: Code
    }
  ];

  const recognitions = [
    {
      title: 'Achievers Award',
      desc: 'Presented by Honorable Chief Minister of TamilNadu M.K. Stalin in 2021.',
      icon: Award
    },
    {
      title: 'YoungSocial Change Maker Award',
      desc: 'Given by Trust for Youth and Child Leadership in 2020.',
      icon: Shield
    },
    {
      title: 'Nambikkai Viruthu',
      desc: 'Awarded by eminent Tamil magazine group Vikatan Publication in 2020.',
      icon: Award
    }
  ];

  return (
    <div className="flex flex-col font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden mb-8">
        <div className="section-padding py-20 relative z-10 scale-in">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              About <span className="gradient-text">VGLUG Foundation</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Villupuram GNU/Linux Users Group (VGLUG) is run by a group of volunteers from Vilupuram. We are a Technical + Philosophical group, caring about the Philosophy of Free Software and Freedom / Free Speech over the Internet.
            </p>
          </div>
        </div>
      </div>

      {/* Vision, Mission, Aims */}
      <div className="section-padding py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bento-cell p-6 group"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.bgColor} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contributions */}
      <div className="py-20 mb-8">
        <div className="section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Contribution to FOSS &amp; Society</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We live in a Society, and not contributing to a society is not fair. Here are some of our key contributions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contributions.map((comp, i) => (
              <div
                key={i}
                className="bento-cell p-6 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                    <comp.icon size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{comp.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{comp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recognitions */}
      <div className="section-padding py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Recognitions</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our efforts have been recognized by various esteemed organizations and leaders.
            </p>
          </div>

          <div className="space-y-6">
            {recognitions.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-6 bento-cell group"
              >
                <div className="p-4 bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 rounded-2xl shrink-0">
                  <item.icon size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
