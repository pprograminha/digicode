const singularOrPlural = (qtd, word) => {
  return qtd === 1 ? word : `${word}s`
}

export const parseResultToMessage = (result) => {
  const suggestedPaintCansMessage = Object.entries(
    result.suggestedPaintCans,
  ).reduce((messages, [liters, qtdCans], currentIndex) => {
    return [
      ...messages,
      <span key={currentIndex}>
        {messages.length > 0 && ','}{' '}
        <span
          style={{
            color: '#00FFFF',
          }}
        >
          {qtdCans} {singularOrPlural(qtdCans, 'lata')}
        </span>{' '}
        de{' '}
        <span
          style={{
            color: '#00FFFF',
          }}
        >
          {String(liters).replaceAll('.', ',')}{' '}
          {singularOrPlural(liters, 'litro')}
        </span>
      </span>,
    ]
  }, [])

  return (
    <span>
      Você precisa de{' '}
      <span
        style={{
          color: '#00FFFF',
        }}
      >
        {result.totalQtyOfPaintNeeded}{' '}
        {singularOrPlural(result.totalQtyOfPaintNeeded, 'litro')}
      </span>{' '}
      de tinta e foi sugerido o seguinte: {suggestedPaintCansMessage}
    </span>
  )
}
