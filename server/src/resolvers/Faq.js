function postedBy(parent, args, context) {
    return context.prisma.faq
      .findUnique({ where: { id: parent.id } })
      .postedBy();
  }

  module.exports = {
    postedBy
  };
