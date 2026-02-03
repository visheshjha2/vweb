-- Create a function to automatically add visheshjha2@gmail.com as admin
CREATE OR REPLACE FUNCTION public.auto_add_admin_user()
RETURNS TRIGGER AS $$
BEGIN
  -- If the newly registered user email is visheshjha2@gmail.com, add them to admin_users
  IF NEW.email = 'visheshjha2@gmail.com' THEN
    INSERT INTO public.admin_users (user_id)
    VALUES (NEW.id)
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to run after user signup
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.auto_add_admin_user();