// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title) {
  const hasKey = this.$te('modules.' + title)
  const translatedTitle = this.$t('modules.' + title) // $t :this method from vue-i18n, inject in @/lang/index.js

  if (hasKey) {
    return translatedTitle
  }
  return title
}

export function optTitle(optKey) {
  const hasKey = this.$te('modules.' + optKey)
  const translatedTitle = this.$t('modules.' + optKey) // $t :this method from vue-i18n, inject in @/lang/index.js

  if (hasKey) {
    return translatedTitle
  }
  return title
}