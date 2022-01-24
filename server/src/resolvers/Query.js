async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
        OR: [
          { tag: { contains: args.filter } },
          { description: { contains: args.filter } },
          { url: { contains: args.filter } }
        ]
      }
    : {};
  const links = await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy
  });

  const users = await context.prisma.user.findMany({ where });

  const faqs = await context.prisma.faq.findMany({ where });

  const count = await context.prisma.link.count({ where });

  return {
    id: 'main-feed',
    links,
    users,
    faqs,
    count
  };
}
module.exports = {
  feed
};