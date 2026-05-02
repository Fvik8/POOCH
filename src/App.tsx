/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
Dog, 
Heart, 
Globe, 
MapPin, 
Users, 
Navigation, 
ArrowRight, 
Menu, 
X,
Instagram,
Facebook,
Twitter,
PawPrint,
CheckCircle2,
Calendar,
CreditCard,
Gift
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Shared Components ---

const Modal = ({ 
isOpen, 
onClose, 
title, 
children 
}: { 
isOpen: boolean, 
onClose: () => void, 
title: string, 
children: React.ReactNode 
}) => {
return (
<AnimatePresence>
{isOpen && (
<div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
onClick={onClose}
className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
/>
<motion.div
initial={{ opacity: 0, scale: 0.95, y: 20 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
exit={{ opacity: 0, scale: 0.95, y: 20 }}
className="relative bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl"
>
<div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
<h3 className="text-2xl font-display font-bold text-slate-800">{title}</h3>
<button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
<X className="w-6 h-6 text-slate-400" />
</button>
</div>
<div className="p-8 max-h-[70vh] overflow-y-auto">
{children}
</div>
</motion.div>
</div>
)}
</AnimatePresence>
);
};

const Button: React.FC<{ 
children: React.ReactNode, 
variant?: 'primary' | 'secondary' | 'outline' | 'ghost',
className?: string,
onClick?: () => void,
href?: string
}> = ({ 
children, 
variant = 'primary', 
className = '',
onClick,
href
}) => {
const variants = {
primary: 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-orange-200',
secondary: 'bg-secondary text-white hover:opacity-90 shadow-lg shadow-blue-100',
outline: 'border-2 border-primary text-primary hover:bg-primary/5',
ghost: 'text-slate-600 hover:text-primary transition-colors'
};

const Component = href ? 'a' : 'button';
const props = href ? { href, onClick: (e: React.MouseEvent) => {
if (href.startsWith('#')) {
e.preventDefault();
const el = document.querySelector(href);
el?.scrollIntoView({ behavior: 'smooth' });
}
onClick?.();
}} : { onClick };

return (
<Component 
{...(props as any)}
className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 active:scale-95 text-center cursor-pointer ${variants[variant]} ${className}`}
>
{children}
</Component>
);
};

// --- Sections ---

const Navbar = ({ onOpenDonate }: { onOpenDonate: () => void }) => {
const [isOpen, setIsOpen] = useState(false);
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
const handleScroll = () => setScrolled(window.scrollY > 20);
window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);

const navLinks = [
{ name: 'Adopt', href: '#adopt' },
{ name: 'Foster', href: '#foster' },
{ name: 'Offices', href: '#offices' },
{ name: 'Success Stories', href: '#stories' },
];

return (
<nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-5'}`}>
<div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
<a href="/" className="flex items-center gap-2 group">
<div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
<PawPrint className="text-white w-6 h-6" />
</div>
<span className="text-2xl font-display font-bold tracking-tight text-slate-800">Pooch</span>
</a>

<div className="hidden md:flex items-center gap-8">
{navLinks.map((link) => (
<Button 
key={link.name} 
variant="ghost"
href={link.href} 
className="text-sm font-medium px-2 py-1"
>
{link.name}
</Button>
))}
<Button variant="primary" className="py-2.5 px-5 text-sm" onClick={onOpenDonate}>Donate Now</Button>
</div>

<button 
className="md:hidden p-2 text-slate-600 hover:text-primary transition-colors"
onClick={() => setIsOpen(!isOpen)}
>
{isOpen ? <X /> : <Menu />}
</button>
</div>

<AnimatePresence>
{isOpen && (
<motion.div
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl p-6 md:hidden flex flex-col gap-4"
>
{navLinks.map((link) => (
<a 
key={link.name} 
href={link.href} 
className="text-lg font-medium text-slate-600 hover:text-primary transition-colors py-2"
onClick={(e) => {
e.preventDefault();
setIsOpen(false);
const el = document.querySelector(link.href);
el?.scrollIntoView({ behavior: 'smooth' });
}}
>
{link.name}
</a>
))}
<Button variant="primary" className="w-full" onClick={() => { setIsOpen(false); onOpenDonate(); }}>Donate Now</Button>
</motion.div>
)}
</AnimatePresence>
</nav>
);
};

const Hero = ({ onOpenSupport }: { onOpenSupport: () => void }) => {
return (
<section className="relative pt-32 pb-20 overflow-hidden">
<div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
<motion.div
initial={{ opacity: 0, x: -30 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.6 }}
>
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-primary text-xs font-bold uppercase tracking-wider mb-6">
<Heart className="w-3 h-3 fill-current" />
<span>Helping paws across Europe</span>
</div>
<h1 className="text-5xl lg:text-7xl mb-6 leading-[1.1]">
Find your new <br /> 
<span className="text-primary italic">best friend</span> today.
</h1>
<p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
We rescue, shelter, and rehome dogs across the continent. Whether you're looking to adopt or foster, your perfect companion is waiting.
</p>
<div className="flex flex-wrap gap-4">
<Button variant="primary" className="flex items-center gap-2" href="#adopt">
Find your dog <ArrowRight className="w-4 h-4" />
</Button>
<Button variant="outline" onClick={onOpenSupport}>Support our cause</Button>
</div>
</motion.div>

<motion.div
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.8, delay: 0.2 }}
className="relative"
>
<div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl bg-orange-50 p-2 border-8 border-white">
<img 
src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1600&h=900" 
alt="Happy Dog" 
className="w-full h-full object-cover rounded-[2rem]"
referrerPolicy="no-referrer"
/>
</div>
<motion.div 
animate={{ y: [0, -10, 0] }}
transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
className="absolute top-10 -left-6 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3"
>
<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
<MapPin className="w-5 h-5" />
</div>
<div>
<p className="text-xs font-bold text-slate-400 uppercase">Available in</p>
<p className="font-display font-bold text-slate-800">Berlin, Germany</p>
</div>
</motion.div>
</motion.div>
</div>
</section>
);
};

const AvailableDogs = ({ onSelectDog }: { onSelectDog: (dog: any) => void }) => {
const dogs = [
{ id: 1, name: 'Luna', breed: 'Golden Retriever', age: '2 years', size: 'Large', location: 'Munich', img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800' },
// MILO (Beagle) - Fixed!
{ id: 2, name: 'Milo', breed: 'Beagle', age: '6 months', size: 'Medium', location: 'Prague', img: 'https://raw.githubusercontent.com/Fvik8/POOCH/main/src/assets/images/TA-2026-05-02-04-39-56-Ahigh-reso-2408548939.png' },
// BELLA (Corgi)
{ id: 3, name: 'Bella', breed: 'Corgi', age: '3 years', size: 'Small', location: 'Lyon', img: 'https://raw.githubusercontent.com/Fvik8/POOCH/main/src/assets/images/TA-2026-05-02-04-05-00-Ahigh-reso-715981615.png' },
// COOPER (Collie)
{ id: 4, name: 'Cooper', breed: 'Border Collie', age: '1 year', size: 'Medium', location: 'Vienna', img: 'https://raw.githubusercontent.com/Fvik8/POOCH/main/src/assets/images/TA-2026-05-02-04-03-12-Ahigh-reso-800879220.png' },
{ id: 5, name: 'Daisy', breed: 'Dachshund', age: '4 years', size: 'Small', location: 'Berlin', img: 'https://images.unsplash.com/photo-1612195583950-b8fd34c87093?auto=format&fit=crop&q=80&w=800' },
{ id: 6, name: 'Rocky', breed: 'German Shepherd', age: '5 years', size: 'Large', location: 'Madrid', img: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=800' },
];

const [filter, setFilter] = useState('All');
const filteredDogs = filter === 'All' ? dogs : dogs.filter(dog => dog.size === filter);

return (
<section id="adopt" className="py-24 bg-slate-50">
<div className="max-w-7xl mx-auto px-6">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
<div>
<h2 className="text-4xl lg:text-5xl mb-4">Available for adoption</h2>
<p className="text-slate-600 text-lg">Meet the lovely dogs waiting for their forever homes across Europe.</p>
</div>
<div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
{['All', 'Small', 'Medium', 'Large'].map((s) => (
<button
key={s}
onClick={() => setFilter(s)}
className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${filter === s ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-primary'}`}
>
{s}
</button>
))}
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
<AnimatePresence mode="popLayout">
{filteredDogs.map((dog) => (
<motion.div
layout
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.9 }}
key={dog.id}
className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group"
>
<div className="relative h-64 overflow-hidden">
<img 
src={dog.img} 
alt={dog.name} 
className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
referrerPolicy="no-referrer"
/>
<div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1.5 shadow-sm">
<MapPin className="w-3 h-3 text-primary" /> {dog.location}
</div>
</div>
<div className="p-8">
<div className="flex justify-between items-start mb-4">
<div>
<h3 className="text-2xl mb-1">{dog.name}</h3>
<p className="text-slate-400 text-sm font-medium">{dog.breed}</p>
</div>
<div className="text-right">
<p className="text-lg font-display font-bold text-primary">{dog.age}</p>
<p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{dog.size}</p>
</div>
</div>
<Button 
variant="primary" 
className="w-full py-2.5 rounded-xl text-sm"
onClick={() => onSelectDog(dog)}
>
Adopt {dog.name}
</Button>
</div>
</motion.div>
))}
</AnimatePresence>
</div>
</div>
</section>
);
};

const Mission = () => {
const goals = [
{
icon: <Globe className="w-6 h-6 text-blue-500" />,
title: "Europe-wide Network",
description: "We operate across 12 countries, ensuring seamless international adoptions."
},
{
icon: <Navigation className="w-6 h-6 text-orange-500" />,
title: "Logistics Support",
description: "Our transport teams ensure your new family member arrives safely."
},
{
icon: <Users className="w-6 h-6 text-purple-500" />,
title: "Local Community",
description: "Access a supporting network of dog owners and trainers in your region."
}
];

return (
<section id="offices" className="py-24 bg-white">
<div className="max-w-7xl mx-auto px-6 text-center">
<h2 className="text-4xl lg:text-5xl mb-16">One mission, one continent.</h2>
<div className="grid md:grid-cols-3 gap-8">
{goals.map((goal, i) => (
<div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
<div className="mb-6 inline-flex p-3 bg-white rounded-2xl shadow-sm">
{goal.icon}
</div>
<h3 className="text-2xl mb-3">{goal.title}</h3>
<p className="text-slate-600">{goal.description}</p>
</div>
))}
</div>
</div>
</section>
);
};

const CallToAction = ({ onFosterClick }: { onFosterClick: () => void }) => {
return (
<section id="foster" className="py-24">
<div className="max-w-7xl mx-auto px-6">
<div className="relative bg-primary rounded-[3rem] p-12 lg:p-20 overflow-hidden text-center text-white">
<h2 className="text-4xl md:text-5xl mb-8">Ready to give a dog <br /> their forever home?</h2>
<div className="flex flex-wrap justify-center gap-4">
<Button variant="outline" href="#adopt" className="bg-white text-primary border-white">Adopt a dog</Button>
<Button variant="outline" onClick={onFosterClick} className="border-white/40 text-white">Become a foster</Button>
</div>
</div>
</div>
</section>
);
};

const Footer = () => {
return (
<footer className="bg-slate-50 pt-20 pb-10">
<div className="max-w-7xl mx-auto px-6">
<div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
<div className="flex items-center gap-2">
<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
<PawPrint className="text-white w-5 h-5" />
</div>
<span className="text-xl font-display font-bold tracking-tight text-slate-800">Pooch</span>
</div>
<div className="flex gap-4">
{[Instagram, Facebook, Twitter].map((Icon, i) => (
<a key={i} href="#" className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 hover:text-primary">
<Icon className="w-5 h-5" />
</a>
))}
</div>
</div>
<div className="pt-8 border-t border-slate-200 text-center text-slate-400 text-xs">
© 2024 Pooch Europe Charity. Registered Charity #E83210.
</div>
</div>
</footer>
);
};

// --- Main App ---

export default function App() {
const [modalType, setModalType] = useState<'donate' | 'adopt' | 'support' | 'none'>('none');
const [selectedDog, setSelectedDog] = useState<any>(null);
const [formSubmitted, setFormSubmitted] = useState(false);

const handleOpenDonate = () => {
setModalType('donate');
setFormSubmitted(false);
};

const handleSelectDog = (dog: any) => {
setSelectedDog(dog);
setModalType('adopt');
setFormSubmitted(false);
};

const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
setFormSubmitted(true);
setTimeout(() => {
setModalType('none');
setSelectedDog(null);
}, 2500);
};

return (
<div className="min-h-screen selection:bg-orange-100 selection:text-primary">
<Navbar onOpenDonate={handleOpenDonate} />
<main>
<Hero onOpenSupport={() => setModalType('support')} />
<AvailableDogs onSelectDog={handleSelectDog} />
<Mission />
<CallToAction onFosterClick={() => setModalType('support')} />
</main>
<Footer />

<Modal isOpen={modalType === 'donate'} onClose={() => setModalType('none')} title="Support our mission">
<AnimatePresence mode="wait">
{!formSubmitted ? (
<form onSubmit={handleSubmit} className="space-y-6">
<div className="grid grid-cols-3 gap-3">
{['€10', '€25', '€50'].map((amt) => (
<button type="button" key={amt} className="p-4 border-2 border-slate-100 rounded-2xl font-bold hover:border-primary hover:text-primary transition-all">{amt}</button>
))}
</div>
<div className="space-y-4">
<div className="relative">
<CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
<input required placeholder="Card Number" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl" />
</div>
</div>
<Button variant="primary" className="w-full py-4 text-lg">Send Donation</Button>
</form>
) : (
<div className="text-center py-12">
<CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
<h4 className="text-2xl font-bold">Thank you!</h4>
</div>
)}
</AnimatePresence>
</Modal>

<Modal isOpen={modalType === 'adopt'} onClose={() => { setModalType('none'); setSelectedDog(null); }} title={selectedDog ? `Adopt ${selectedDog.name}` : 'Application'}>
<AnimatePresence mode="wait">
{!formSubmitted ? (
<form onSubmit={handleSubmit} className="space-y-6">
{selectedDog && (
<div className="flex items-center gap-4 p-4 bg-orange-50 rounded-2xl">
<img src={selectedDog.img} className="w-16 h-16 rounded-xl object-cover" alt="" referrerPolicy="no-referrer" />
<p className="font-bold">{selectedDog.name}</p>
</div>
)}
<input required placeholder="Full Name" className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl" />
<input required type="email" placeholder="Email Address" className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl" />
<textarea placeholder="Your message..." className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl h-32 resize-none" />
<Button variant="primary" className="w-full py-4 text-lg">Submit Application</Button>
</form>
) : (
<div className="text-center py-12">
<CheckCircle2 className="w-16 h-16 text-blue-500 mx-auto mb-4" />
<h4 className="text-2xl font-bold">Application Received</h4>
</div>
)}
</AnimatePresence>
</Modal>

<Modal isOpen={modalType === 'support'} onClose={() => setModalType('none')} title="Support Pooch">
<div className="space-y-6">
{[
{ icon: <Gift className="w-5 h-5 text-pink-500" />, title: "In-kind Donations" },
{ icon: <Users className="w-5 h-5 text-purple-500" />, title: "Volunteer Overseas" },
{ icon: <Calendar className="w-5 h-5 text-blue-500" />, title: "Foster a Dog" }
].map((item, i) => (
<div key={i} className="p-5 bg-slate-50 rounded-2xl flex gap-4">
<div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">{item.icon}</div>
<p className="font-bold self-center">{item.title}</p>
</div>
))}
<Button variant="primary" className="w-full" onClick={() => setModalType('none')}>Got it!</Button>
</div>
</Modal>
</div>
);
}
