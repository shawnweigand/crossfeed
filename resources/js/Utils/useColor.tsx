export default function useColor({bg, text}: { bg: string, text: string }) {

    const selectColor: {
        bg: { [key: string]: string },
        text: { [key: string]: string }
    } = {
        bg: {
            red: 'bg-red-500',
            orange: 'bg-orange-500',
            amber: 'bg-amber-500',
            yellow: 'bg-yellow-500',
            lime: 'bg-lime-500',
            green: 'bg-green-500',
            emerald: 'bg-emerald-500',
            teal: 'bg-teal-500',
            cyan: 'bg-cyan-500',
            sky: 'bg-sky-500',
            blue: 'bg-blue-500',
            indigo: 'bg-indigo-500',
            violet: 'bg-violet-500',
            purple: 'bg-purple-500',
            fuchsia: 'bg-fuchsia-500',
            pink: 'bg-pink-500',
            rose: 'bg-rose-500',
            slate: 'bg-slate-500',
            gray: 'bg-gray-500',
            zinc: 'bg-zinc-500',
            neutral: 'bg-neutral-500',
            stone: 'bg-stone-500',
            white: 'bg-white',
            black: 'bg-black',
        },
        text: {
            red: 'text-red-500',
            orange: 'text-orange-500',
            amber: 'text-amber-500',
            yellow: 'text-yellow-500',
            lime: 'text-lime-500',
            green: 'text-green-500',
            emerald: 'text-emerald-500',
            teal: 'text-teal-500',
            cyan: 'text-cyan-500',
            sky: 'text-sky-500',
            blue: 'text-blue-500',
            indigo: 'text-indigo-500',
            violet: 'text-violet-500',
            purple: 'text-purple-500',
            fuchsia: 'text-fuchsia-500',
            pink: 'text-pink-500',
            rose: 'text-rose-500',
            slate: 'text-slate-500',
            gray: 'text-gray-500',
            zinc: 'text-zinc-500',
            neutral: 'text-neutral-500',
            stone: 'text-stone-500',
            white: 'text-white',
            black: 'text-black',
        }
    }

    return {
        bg: selectColor.bg[bg],
        text: selectColor.text[text]
    }

}
