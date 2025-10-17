from supabase import create_client, Client
from config.config import generate_config
import tempfile, os, uuid

config = generate_config()
supabase: Client = create_client(config.supabase_url, config.supabase_key)


class InvestorModel:
    table_name = "investor"

    @staticmethod
    def create_investor(data):
        return supabase.table(InvestorModel.table_name).insert(data).execute()
    @staticmethod
    def find_by_email(email):
        """Cari investor berdasarkan email"""
        return supabase.table(InvestorModel.table_name).select("*").eq("email", email).execute()

    @staticmethod
    def find_by_nik(nik):
        """Cari investor berdasarkan NIK"""
        return supabase.table(InvestorModel.table_name).select("*").eq("nik", nik).execute()
    @staticmethod
    def get_all():
        return supabase.table(InvestorModel.table_name).select("*").execute()
