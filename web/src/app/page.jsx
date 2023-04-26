'use client'

import { useMemo, useState } from 'react'
import { GrSend as GrSendIcon } from 'react-icons/gr'
import { Form } from '../modules/components/Form'
import { Wall } from '../modules/components/Wall'
import * as S from './styles'
import { suggestWallPaintCans } from '../services'
import { useToast } from '../hooks/useToast'
import { useMutation } from 'react-query'
import { Button } from '../modules/components/Button'
import { Message } from '../modules/components/Message'
export default function Home() {
  const [walls, setWalls] = useState([
    {
      show: true,
    },
  ])
  const [isDone, setIsDone] = useState(false)

  const maxWalls = 4

  const wallBlocks = useMemo(() => {
    return Array.from(
      {
        length: maxWalls,
      },
      (v, key) => ({ key: key + 1 }),
    ).map((wallBlock, index) => {
      wallBlock = {
        id: walls[index]?.id,
        data: wallBlock,
        show: walls[index]?.show,
      }
      return wallBlock
    })
  }, [walls, maxWalls])

  const blockedAll = wallBlocks.some((wallBlock) => !wallBlock.id)

  const { addToast } = useToast()

  const suggestWallPaintCansMutation = useMutation(
    ['suggest-wall-paint-cans'],
    suggestWallPaintCans,
    {
      onSuccess: () => {
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Requisição realizada com sucesso!',
        })
      },
      onError: (error) => {
        switch (error?.response?.data?.name) {
          case 'HeightError':
            addToast({
              type: 'error',
              title: 'Erro com a altura da porta!',
              description:
                'A altura da porta tem que ser 30cm menor que a altura da parede',
            })

            break

          default:
            addToast({
              type: 'error',
              title: 'Ocorreu um erro!',
              description:
                error?.response?.data?.name && error.response.data.messages[0]
                  ? `Error: ${error.response.data.messages[0]}`
                  : 'Tente novamente mais tarde!',
            })

            break
        }
      },
    },
  )

  return (
    <S.Container>
      {suggestWallPaintCansMutation.data && (
        <Message result={suggestWallPaintCansMutation.data} />
      )}
      <S.WallsContainer>
        {wallBlocks.map((wallBlock) => (
          <Wall
            key={wallBlock.data.key}
            isBlocked={blockedAll}
            wall={wallBlock.data}
            wallBlock={wallBlock}
            onWalls={setWalls}
            isCurrent={!!wallBlock.show}
            isEmpty={!wallBlock.id}
            isAdded={!!wallBlock.id}
          />
        ))}
      </S.WallsContainer>
      <S.FormContainer>
        {walls.map((wall) => {
          if (!wall.show) return null

          return (
            <Form
              onDone={() => setIsDone(true)}
              key={wall.id || wall.show}
              data={wall.data}
              walls={walls}
              onWalls={(walls) => setWalls([...walls])}
            />
          )
        })}
      </S.FormContainer>
      {isDone && (
        <Button
          isLoading={suggestWallPaintCansMutation.isLoading}
          onClick={() =>
            suggestWallPaintCansMutation.mutate({
              walls: walls.map((wall) => wall.data),
            })
          }
        >
          Enviar <GrSendIcon color="#8b8b8b" />
        </Button>
      )}
    </S.Container>
  )
}
