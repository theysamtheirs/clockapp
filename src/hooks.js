export async function getSession(request) {
    const { user } = request.locals.supabase.auth.session()
  
    return {
      user,
    }
  }
  