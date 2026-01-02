import Header from "../components/Header";
import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#0a0e27] uppercase tracking-tighter mb-4 md:mb-6">
            Meet
          </h1>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#0a0e27] uppercase tracking-tighter mb-4 md:mb-6">
            Atle
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 uppercase tracking-wide mb-12 md:mb-16">
            Atle Lie McGrath, Alpine Skier
          </p>
        </div>
      </section>

      {/* Stats/Info Section */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            <div>
              <div className="text-sm md:text-base font-bold text-gray-500 uppercase tracking-wider mb-2">
                Name
              </div>
              <div className="text-lg md:text-xl lg:text-2xl font-bold text-[#0a0e27]">
                Atle Lie McGrath
              </div>
            </div>
            <div>
              <div className="text-sm md:text-base font-bold text-gray-500 uppercase tracking-wider mb-2">
                Nationality
              </div>
              <div className="text-lg md:text-xl lg:text-2xl font-bold text-[#0a0e27]">
                Norwegian
              </div>
            </div>
            <div>
              <div className="text-sm md:text-base font-bold text-gray-500 uppercase tracking-wider mb-2">
                Hometown
              </div>
              <div className="text-lg md:text-xl lg:text-2xl font-bold text-[#0a0e27]">
                Oslo, Norway
              </div>
            </div>
            <div>
              <div className="text-sm md:text-base font-bold text-gray-500 uppercase tracking-wider mb-2">
                Born
              </div>
              <div className="text-lg md:text-xl lg:text-2xl font-bold text-[#0a0e27]">
                Vermont, USA
              </div>
            </div>
            <div>
              <div className="text-sm md:text-base font-bold text-gray-500 uppercase tracking-wider mb-2">
                Team
              </div>
              <div className="text-lg md:text-xl lg:text-2xl font-bold text-[#0a0e27]">
                Norwegian National Team
              </div>
            </div>
            <div>
              <div className="text-sm md:text-base font-bold text-gray-500 uppercase tracking-wider mb-2">
                Age
              </div>
              <div className="text-lg md:text-xl lg:text-2xl font-bold text-[#0a0e27]">
                25
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Atle Section */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0a0e27] uppercase tracking-tighter mb-6 md:mb-8">
            About Atle
          </h3>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed mb-6">
            Atle is a 25-year-old Norwegian alpine skier, born in the USA, racing for the Norwegian National Team. He skied his first World Cup race at the age of 18, scored his first World Cup points at the age of 19, captured his first World Cup Podium at the age of 20, and his first World Cup victories at the age of 21.
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed">
            Despite sustaining two serious knee injuries, he has 18 World Cup podiums to his name, including four victories. He also earned a silver medal at the 2025 World Ski Championships in slalom.
          </p>
        </div>
      </section>

      {/* Year-by-Year Breakdown */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* 2025 */}
          <div className="mb-12 md:mb-16">
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0a0e27] uppercase tracking-tighter mb-4 md:mb-6">
              2025
            </h4>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed mb-4">
              Atle earned a silver medal at the 2025 World Ski Championships in slalom. His goals for the 2025/2026-season is to continue to win World Cup races in slalom, continue to podium in giant slalom, and to chase his first giant slalom victory. Another goal is the upcoming Olympics in Bormio.
            </p>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed">
              Atle is also planning on racing some speed, after his sensational 5th place in his World Cup debut in Super-G.
            </p>
          </div>

          {/* 2021-2024 (First World Cup Victories) */}
          <div className="mb-12 md:mb-16">
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0a0e27] uppercase tracking-tighter mb-4 md:mb-6">
              2021
            </h4>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed mb-4">
              At the age of 21, Atle captured his first World Cup victories, marking a significant milestone in his career. This achievement came just one year after his first World Cup podium.
            </p>
          </div>

          {/* 2020 (First World Cup Podium) */}
          <div className="mb-12 md:mb-16">
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0a0e27] uppercase tracking-tighter mb-4 md:mb-6">
              2020
            </h4>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed mb-4">
              At the age of 20, Atle captured his first World Cup podium, demonstrating his ability to compete at the highest level of alpine skiing.
            </p>
          </div>

          {/* 2019 (First World Cup Points) */}
          <div className="mb-12 md:mb-16">
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0a0e27] uppercase tracking-tighter mb-4 md:mb-6">
              2019
            </h4>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed mb-4">
              At the age of 19, Atle scored his first World Cup points, establishing himself as a promising talent in alpine skiing.
            </p>
          </div>

          {/* 2018 (First World Cup Race) */}
          <div className="mb-12 md:mb-16">
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0a0e27] uppercase tracking-tighter mb-4 md:mb-6">
              2018
            </h4>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed mb-4">
              At the age of 18, Atle skied his first World Cup race, marking the beginning of his professional alpine skiing career at the highest level.
            </p>
          </div>

          {/* Before 2018 */}
          <div className="mb-12 md:mb-16">
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0a0e27] uppercase tracking-tighter mb-4 md:mb-6">
              Before 2018
            </h4>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed mb-4">
              Atle was born in Vermont, USA, and moved to Norway when he was two years old. He still represents the ski club he grew up with, Bærum Skiklub, and resides in Oslo, Norway.
            </p>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed">
              Atle is proud to be part of the Norwegian National Team: "Everyone works together towards the same goal, and that makes the journey better, more fun and more rewarding. The good days become even better, and the tough days much easier to handle." Atle is currently the athlete representative for the technical team and strongly believes in the Attacking Vikings culture, which looks at alpine skiing as a team sport outside of the two minutes they race. They are lucky to have former team members, including Aksel Lund Svindal and Kjetil Jansrud, still contributing as mentors.
            </p>
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Long-term Goals */}
          <div className="mb-12 md:mb-16">
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0a0e27] uppercase tracking-tighter mb-4 md:mb-6">
              Long-term Goals
            </h4>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed">
              His long-term goals are to win the World Cup overall and to capture medals at the upcoming Olympics and World Ski Championships, including in Narvik, Norway, in 2029.
            </p>
          </div>

          {/* Ambassadorships */}
          <div className="mb-12 md:mb-16">
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0a0e27] uppercase tracking-tighter mb-4 md:mb-6">
              Ambassadorships
            </h4>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed mb-4">
              He is proud to be an ambassador for "MOT Norway", a non-profit organization that offers preventive and attitude-creating programs for schools, and "AKTIV Against Cancer", a non-profit organization working to make physical activity an integral part of cancer treatment.
            </p>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed">
              Atle is also an ambassador for BRASS, an avalanche education program for ski racers.
            </p>
          </div>

          {/* Personal Interests */}
          <div className="mb-12 md:mb-16">
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0a0e27] uppercase tracking-tighter mb-4 md:mb-6">
              Personal Interests
            </h4>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed mb-4">
              Outside of skiing, Atle enjoys sports such as golf, tennis and Formula 1. He has taken a few classes at the Norwegian School of Sport Sciences, but is currently skiing full-time.
            </p>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed">
              Atle is fluent in Norwegian and English, and his German continues to improve.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0e27] h-16 w-full"></footer>
    </div>
  );
}
