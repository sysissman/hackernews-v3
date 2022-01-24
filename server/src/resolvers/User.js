function links(parent, args, context) {
  return context.prisma.user
    .findUnique({ where: { id: parent.id } })
    .links();
}

function faqs(parent, args, context) {
  return context.prisma.user
    .findUnique({ where: { id: parent.id } })
    .faqs();
}

module.exports = {
  links,
  
  faqs
};