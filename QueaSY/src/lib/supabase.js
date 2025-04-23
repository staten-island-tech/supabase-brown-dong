import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://nunjlwwsavwscdicqtpj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51bmpsd3dzYXZ3c2NkaWNxdHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2OTcxMTQsImV4cCI6MjA1OTI3MzExNH0.VdYiovLTJB2nLtI5rWwVRUZY0bUyGQrAcxxss1RSUAo"
);
