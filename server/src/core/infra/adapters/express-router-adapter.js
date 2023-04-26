export const adaptRoute = (controller) => {
  return async (request, response) => {
    const data = {
      ...request.body,
      ...request.query,
      ...request.params,
    }

    const httpResponse = await controller.handle(data)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return response
        .status(httpResponse.statusCode)
        .json(httpResponse.body.data)
    }

    return response
      .status(httpResponse.statusCode)
      .json(httpResponse.body.error)
  }
}
