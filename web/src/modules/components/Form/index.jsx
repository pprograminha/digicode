'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { tint } from 'polished'
import { useForm } from 'react-hook-form'
import { AiOutlineNumber as AiOutlineNumberIcon } from 'react-icons/ai'
import { v4 as uuid } from 'uuid'
import * as z from 'zod'
import { Button } from '../Button'
import * as S from './styles'

const schema = z.object({
  width: z.preprocess(
    (width) => Number(z.string().parse(width)),
    z
      .number({
        required_error: 'Campo obrigatório!',
        invalid_type_error: 'Deve ser um número',
      })
      .positive('Número maior do que 0')
      .min(1, 'Número deve ser maior que 1')
      .max(50, 'Número deve ser menor que 50'),
  ),
  height: z.preprocess(
    (height) => Number(z.string().parse(height)),
    z
      .number({
        required_error: 'Campo obrigatório!',
        invalid_type_error: 'Deve ser um número',
      })
      .positive('Número maior do que 0')
      .min(1, 'Número deve ser maior que 1')
      .max(50, 'Número deve ser menor que 50'),
  ),
  quantityOfWindows: z
    .preprocess(
      (quantityOfWindows) =>
        quantityOfWindows
          ? Number(z.string().parse(quantityOfWindows))
          : undefined,
      z
        .number({
          required_error: 'Campo obrigatório!',
          invalid_type_error: 'Deve ser um número',
        })
        .positive('Número maior do que 0')
        .int('Número inteiro!')
        .optional(),
    )
    .optional(),
  quantityOfDoors: z.preprocess(
    (quantityOfDoors) =>
      quantityOfDoors ? Number(z.string().parse(quantityOfDoors)) : undefined,
    z
      .number({
        required_error: 'Campo obrigatório!',
        invalid_type_error: 'Deve ser um número',
      })
      .positive('Número maior do que 0')
      .int('Número inteiro!')
      .optional(),
  ),
})

export function Form({ onWalls, walls, data, onDone }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const maxWalls = 4
  const onSubmit = (data) => {
    const updatedWalls = walls.length === maxWalls ? walls : [...walls, {}]

    const currentWallIndex = updatedWalls.findIndex((wall) => wall.show)
    const nextWallIndex = currentWallIndex + 1

    if (!updatedWalls[currentWallIndex].data && updatedWalls[nextWallIndex]) {
      updatedWalls[nextWallIndex] = {
        ...updatedWalls[nextWallIndex],

        show: true,
      }
    }
    updatedWalls[currentWallIndex] = {
      ...updatedWalls[currentWallIndex],
      ...(walls.length <= maxWalls
        ? {
            id: uuid(),
            data,
            ...(updatedWalls[currentWallIndex].data
              ? {
                  show: true,
                }
              : {
                  show: !!(
                    !updatedWalls[currentWallIndex + 1] &&
                    walls.length === maxWalls
                  ),
                }),
          }
        : {}),
    }

    onWalls([...updatedWalls])

    if (walls.length === maxWalls) {
      onDone()
    }
  }

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.InputGroup row>
        <div>
          <label>
            <AiOutlineNumberIcon size={20} color={tint(0.3, '#16171a')} />{' '}
            <span>Largura:</span>
          </label>
          <input
            defaultValue={data?.width}
            {...register('width')}
            placeholder="De 1 a 50"
          />
          <S.Error>{errors.width?.message}</S.Error>
        </div>
        <div>
          <label>
            <AiOutlineNumberIcon size={20} color={tint(0.3, '#16171a')} />{' '}
            <span>Altura:</span>
          </label>
          <input
            defaultValue={data?.height}
            {...register('height')}
            placeholder="De 1 a 50"
          />
          <S.Error>{errors.height?.message}</S.Error>
        </div>
      </S.InputGroup>
      <S.InputGroup>
        <label>
          <AiOutlineNumberIcon size={20} color={tint(0.3, '#16171a')} />{' '}
          <span>
            Quantidade de portas:{' '}
            <span
              style={{
                color: tint(0.3, '#16171a'),
                fontSize: 12,
              }}
            >
              (0,80 x 1,90 metros cada)
            </span>
          </span>
        </label>
        <input
          defaultValue={data?.quantityOfDoors}
          {...register('quantityOfDoors')}
          placeholder="> 0"
        />
        <S.Error>{errors.quantityOfDoors?.message}</S.Error>
      </S.InputGroup>
      <S.InputGroup>
        <label>
          <AiOutlineNumberIcon size={20} color={tint(0.3, '#16171a')} />{' '}
          <span>
            Quantidade de janelas:{' '}
            <span
              style={{
                color: tint(0.3, '#16171a'),
                fontSize: 12,
              }}
            >
              (2,00 x 1,20 metros cada)
            </span>
          </span>
        </label>
        <input
          defaultValue={data?.quantityOfWindows}
          {...register('quantityOfWindows')}
          placeholder="> 0"
        />
        <S.Error>{errors.quantityOfWindows?.message}</S.Error>
      </S.InputGroup>
      <Button type="submit">
        {data ? 'Atualizar parede' : 'Adicionar parede'}
      </Button>
    </S.Form>
  )
}
