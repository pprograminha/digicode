export const ok = (dto) => {
  return {
    statusCode: 200,
    body: {
      data: dto || null,
      error: null,
    },
  }
}

export const genericError = (error) => {
  return {
    statusCode: 400,
    body: {
      data: null,
      error: {
        name: error.name,
        messages: [error.message],
      },
    },
  }
}

export const fail = () => {
  return {
    statusCode: 400,
    body: {
      data: null,
      error: {
        name: 'InternalServerError',
        messages: null,
      },
    },
  }
}
