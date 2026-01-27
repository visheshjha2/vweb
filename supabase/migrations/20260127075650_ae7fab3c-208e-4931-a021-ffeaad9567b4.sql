-- Create projects table for admin to manage portfolio projects
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  live_url TEXT,
  github_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_messages table for storing contact form submissions
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_users table to track who is admin
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin status
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = _user_id
  )
$$;

-- Projects: Anyone can read, only admins can modify
CREATE POLICY "Anyone can view projects" ON public.projects
FOR SELECT USING (true);

CREATE POLICY "Admins can insert projects" ON public.projects
FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update projects" ON public.projects
FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete projects" ON public.projects
FOR DELETE USING (public.is_admin(auth.uid()));

-- Contact messages: Anyone can insert, only admins can read/update/delete
CREATE POLICY "Anyone can send contact messages" ON public.contact_messages
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view contact messages" ON public.contact_messages
FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update contact messages" ON public.contact_messages
FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete contact messages" ON public.contact_messages
FOR DELETE USING (public.is_admin(auth.uid()));

-- Admin users: Only existing admins can manage
CREATE POLICY "Admins can view admin_users" ON public.admin_users
FOR SELECT USING (public.is_admin(auth.uid()));

-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);

-- Storage policies for project images
CREATE POLICY "Anyone can view project images" ON storage.objects
FOR SELECT USING (bucket_id = 'project-images');

CREATE POLICY "Admins can upload project images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'project-images' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can update project images" ON storage.objects
FOR UPDATE USING (bucket_id = 'project-images' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete project images" ON storage.objects
FOR DELETE USING (bucket_id = 'project-images' AND public.is_admin(auth.uid()));

-- Enable realtime for contact messages to show notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_messages;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates on projects
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();