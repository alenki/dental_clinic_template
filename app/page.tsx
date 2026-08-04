import { Hero } from "@/components/sections/hero";
import { Philosophy } from "@/components/sections/philosophy";
import { Care } from "@/components/sections/care";
import { Method } from "@/components/sections/method";
import { People } from "@/components/sections/people";
import { Visit } from "@/components/sections/visit";
import { Voices } from "@/components/sections/voices";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Care />
      <Method />
      <People />
      <Visit />
      <Voices />
    </>
  );
}
