import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  CalendarCheck2,
  Camera,
  CheckCircle2,
  ChevronRight,
  Heart,
  Music2,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import FeaturedServices from "../../components/FeaturedServices/FeaturedServices";

const categories = [
  { name: "Wedding", icon: Heart, color: "bg-rose-50 text-rose-600" },
  { name: "Birthday", icon: Sparkles, color: "bg-amber-50 text-amber-600" },
  { name: "Corporate", icon: Building2, color: "bg-sky-50 text-sky-600" },
  { name: "Anniversary", icon: Camera, color: "bg-violet-50 text-violet-600" },
  {
    name: "Engagement",
    icon: UsersRound,
    color: "bg-emerald-50 text-emerald-600",
  },
  { name: "Baby Shower", icon: Music2, color: "bg-pink-50 text-pink-600" },
];

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");

  const goToServices = (event) => {
    event?.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (category) params.set("category", category);
    if (budget) params.set("maxPrice", budget);
    navigate(`/services${params.toString() ? `?${params}` : ""}`);
  };

  const chooseCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    navigate(`/services?category=${encodeURIComponent(selectedCategory)}`);
  };

  return (
    <div className="overflow-hidden bg-stone-50">
      <section className="relative isolate bg-[#16132b] pb-28 pt-16 text-white sm:pt-24">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_15%,rgba(251,146,60,0.28),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(129,140,248,0.34),transparent_34%),linear-gradient(135deg,#17142d_0%,#2a2151_55%,#17142d_100%)]" />
        <div className="absolute -left-24 top-36 -z-10 h-72 w-72 rounded-full bg-pink-400/20 blur-3xl" />
        <div className="absolute -right-20 top-0 -z-10 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.08fr_.92fr]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-indigo-100 backdrop-blur">
              <Sparkles size={16} className="text-amber-300" />
              India&apos;s celebration marketplace
            </div>
            <h1 className="mt-7 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Every celebration,
              <span className="block bg-gradient-to-r from-amber-200 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                beautifully planned.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-indigo-100/85">
              Discover trusted venues, decorators, photographers, DJs and
              more—then book the people who make your moment unforgettable.
            </p>
            <form
              onSubmit={goToServices}
              className="mt-9 rounded-2xl bg-white p-3 text-gray-900 shadow-2xl shadow-black/25 sm:flex sm:items-center sm:gap-2"
            >
              <div className="flex flex-1 items-center gap-3 border-b border-gray-100 px-3 py-3 sm:border-b-0 sm:border-r">
                <Search className="text-indigo-600" size={21} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search venues, photographers, DJs..."
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
                />
              </div>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full bg-transparent px-3 py-3 text-sm outline-none sm:w-36"
              >
                <option value="">All events</option>
                {categories.map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <select
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                className="w-full border-t border-gray-100 bg-transparent px-3 py-3 text-sm outline-none sm:w-32 sm:border-l sm:border-t-0"
              >
                <option value="">Any budget</option>
                <option value="10000">Up to ₹10k</option>
                <option value="25000">Up to ₹25k</option>
                <option value="50000">Up to ₹50k</option>
              </select>
              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:mt-0 sm:w-auto"
              >
                Search <ArrowRight size={17} />
              </button>
            </form>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-indigo-100/80">
              <span className="font-medium text-white">Popular:</span>
              <button
                onClick={() => chooseCategory("Wedding")}
                className="hover:text-amber-200"
              >
                Wedding venues
              </button>
              <button
                onClick={() => chooseCategory("Birthday")}
                className="hover:text-amber-200"
              >
                Birthday decorators
              </button>
              <button
                onClick={() => chooseCategory("Corporate")}
                className="hover:text-amber-200"
              >
                Corporate events
              </button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-amber-300/20 to-pink-400/10 blur-2xl" />
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1100&q=85"
              alt="Wedding celebration table decorated with flowers"
              className="relative h-[420px] w-full rounded-[2rem] object-cover shadow-2xl ring-1 ring-white/20 lg:h-[510px]"
            />
            <div className="absolute -bottom-6 -left-5 animate-[float_5s_ease-in-out_infinite] rounded-2xl bg-white p-4 text-gray-900 shadow-xl sm:-left-10">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-600">
                  <CheckCircle2 size={21} />
                </div>
                <div>
                  <p className="text-sm font-bold">Verified vendors</p>
                  <p className="text-xs text-gray-500">Book with confidence</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-3 top-8 animate-[float_6s_ease-in-out_infinite_700ms] rounded-2xl border border-white/40 bg-white/90 p-4 text-gray-900 shadow-xl backdrop-blur">
              <p className="text-lg font-bold">One place</p>
              <p className="text-xs font-medium text-gray-500">
                for every detail
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-6">
        <div className="grid rounded-2xl border border-gray-100 bg-white p-5 shadow-xl shadow-indigo-950/10 sm:grid-cols-3 sm:p-7">
          {[
            ["Curated", "Event partners", UsersRound],
            ["6", "Celebration categories", CalendarCheck2],
            ["Simple", "Booking journey", ShieldCheck],
          ].map(([value, label, Icon], index) => (
            <div
              key={label}
              className={`flex items-center gap-4 px-3 py-3 ${index !== 0 ? "sm:border-l sm:border-gray-100 sm:pl-8" : ""}`}
            >
              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                <Icon size={23} />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
              Find your fit
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Plan by occasion
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Explore all services <ChevronRight size={18} />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map(({ name, icon: Icon, color }) => (
            <button
              key={name}
              onClick={() => chooseCategory(name)}
              className="group rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
            >
              <span className={`inline-flex rounded-xl p-3 ${color}`}>
                <Icon size={22} />
              </span>
              <span className="mt-4 block font-bold text-gray-900">{name}</span>
              <span className="mt-1 inline-flex items-center text-sm text-gray-500 group-hover:text-indigo-600">
                Browse{" "}
                <ArrowRight
                  className="ml-1 transition-transform group-hover:translate-x-1"
                  size={14}
                />
              </span>
            </button>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
              Top picks
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured for your next event
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View all <ChevronRight size={18} />
          </Link>
        </div>
        <div className="mt-9">
          <FeaturedServices />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-indigo-700 px-8 py-12 text-white sm:px-14 sm:py-16">
          <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full bg-amber-300/20 blur-2xl" />
          <div className="relative max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-200">
              For every big moment
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Your celebration deserves more than a to-do list.
            </h2>
            <p className="mt-4 text-indigo-100">
              Compare exceptional local services in one place and start planning
              your perfect event today.
            </p>
            <Link
              to="/services"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-indigo-700 transition hover:bg-indigo-50"
            >
              Start exploring <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
