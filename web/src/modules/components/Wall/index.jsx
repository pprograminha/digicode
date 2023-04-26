import * as S from './styles'
import { TiPlus as TiPlusIcon } from 'react-icons/ti'
export function Wall({
  wall,
  wallBlock,
  isEmpty,
  isBlocked: _isBlocked,
  isCurrent,
  onWalls,
  isAdded,
}) {
  const isBlocked = isCurrent || isEmpty || _isBlocked

  return (
    <S.Wall
      currOff={!isAdded && isCurrent}
      isCurrent={isCurrent}
      onClick={() =>
        onWalls((walls) => [
          ...walls.map((mapWall) => {
            return {
              ...mapWall,
              ...(!isBlocked
                ? {
                    show: wallBlock.id === mapWall.id,
                  }
                : {}),
            }
          }),
        ])
      }
      isBlocked={isBlocked}
    >
      {!isEmpty || isCurrent ? (
        <>
          <span
            {...(wall.key === 3
              ? {
                  style: {
                    marginTop: 26,
                  },
                }
              : {})}
          />
          <span
            {...(wall.key === 3
              ? {
                  style: {
                    marginTop: 26,
                  },
                }
              : {})}
          />
          <span />
          <span />
          <span />
          <span />
          <span
            {...(wall.key === 3
              ? {
                  style: {
                    marginTop: 26,
                  },
                }
              : {})}
          />
          <span
            {...(wall.key === 1 || wall.key === 3
              ? {
                  style: {
                    marginLeft: 10,
                  },
                }
              : {})}
          />
        </>
      ) : (
        <TiPlusIcon size={40} />
      )}
    </S.Wall>
  )
}
