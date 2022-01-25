export const getMaritalId = (id) => {
  const martials = [
    { id: 1, description: 'Single' },
    { id: 2, description: 'Married' },
    { id: 3, sdescription: 'Relationship' }
  ]
  return martials.find((item) => item.id === parseInt(id))?.description || ''
}

export const getMembership = (id) => {
  const membership = [
    { id: 1, description: 'Free' },
    { id: 2, description: 'Pro' }
  ]
  return membership.find((item) => item.id === parseInt(id))?.description || ''
}
