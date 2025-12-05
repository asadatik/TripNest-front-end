// Validation utilities for forms
export const validatePackageForm = (data: { title: string; description: string; price: string; duration: string }) => {
  const errors: Record<string, string> = {}

  if (!data.title.trim()) {
    errors.title = "Title is required"
  }

  if (!data.description.trim()) {
    errors.description = "Description is required"
  }

  if (!data.price || isNaN(Number(data.price)) || Number(data.price) <= 0) {
    errors.price = "Valid price is required"
  }

  if (!data.duration.trim()) {
    errors.duration = "Duration is required"
  }

  return { isValid: Object.keys(errors).length === 0, errors }
}

export const validateUserForm = (data: { name: string; email: string }) => {
  const errors: Record<string, string> = {}

  if (!data.name.trim()) {
    errors.name = "Name is required"
  }

  if (!data.email.trim()) {
    errors.email = "Email is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email format"
  }

  return { isValid: Object.keys(errors).length === 0, errors }
}
