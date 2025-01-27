interface Props {
    color: string
    onSelect: (color: string) => void
}

export default function ColorGrid({color, onSelect}: Props) {

    return (
        <>
            {color}
        </>
      )

}
