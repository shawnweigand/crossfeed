interface Props {
    color: string
    onSelect: (color: string) => void
}

export default function ColorGrid({color, onSelect}: Props) {

    const colors: {
        [key: string]: {
            bg: string
            text: string
        }
    } = {
        red: {
            bg: 'bg-red-500',
            text: 'text-red-500'
        },
        orange: {
            bg: 'bg-orange-500',
            text: 'text-orange-500'
        },
        amber: {
            bg: 'bg-amber-500',
            text: 'text-amber-500'
        },
        yellow: {
            bg: 'bg-yellow-500',
            text: 'text-yellow-500'
        },
        lime: {
            bg: 'bg-lime-500',
            text: 'text-lime-500'
        },
        green: {
            bg: 'bg-green-500',
            text: 'text-green-500'
        },
        emerald: {
            bg: 'bg-emerald-500',
            text: 'text-emerald-500'
        },
        teal: {
            bg: 'bg-teal-500',
            text: 'text-teal-500'
        },
        cyan: {
            bg: 'bg-cyan-500',
            text: 'text-cyan-500'
        },
        sky: {
            bg: 'bg-sky-500',
            text: 'text-sky-500'
        },
        blue: {
            bg: 'bg-blue-500',
            text: 'text-blue-500'
        },
        indigo: {
            bg: 'bg-indigo-500',
            text: 'text-indigo-500'
        },
        violet: {
            bg: 'bg-violet-500',
            text: 'text-violet-500'
        },
        purple: {
            bg: 'bg-purple-500',
            text: 'text-purple-500'
        },
        fuchsia: {
            bg: 'bg-fuchsia-500',
            text: 'text-fuchsia-500'
        },
        pink: {
            bg: 'bg-pink-500',
            text: 'text-pink-500'
        },
        rose: {
            bg: 'bg-rose-500',
            text: 'text-rose-500'
        },
        slate: {
            bg: 'bg-slate-500',
            text: 'text-slate-500'
        },
        gray: {
            bg: 'bg-gray-500',
            text: 'text-gray-500'
        },
        zinc: {
            bg: 'bg-zinc-500',
            text: 'text-zinc-500'
        },
        neutral: {
            bg: 'bg-neutral-500',
            text: 'text-neutral-500'
        },
        stone: {
            bg: 'bg-stone-500',
            text: 'text-stone-500'
        },
        white: {
            bg: 'bg-white',
            text: 'text-white'
        },
        black: {
            bg: 'bg-black',
            text: 'text-black'
        },
    }

    return (
        <div className="grid grid-cols-6 gap-12">
            {Object.entries(colors).map(([key, value]: [string, {bg: string, text: string}]) => (
                <button
                    key={key}
                    className={
                        value.bg === color || value.text === color ?
                        `${value.bg} size-8 rounded outline outline-2 outline-offset-2 outline-indigo-500` :
                        `${value.bg} size-8 rounded hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-indigo-500`
                    }
                    onClick={() => onSelect(key)}
                >
                </button>
            ))}
        </div>
      )

}
