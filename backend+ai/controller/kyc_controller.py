from model.kyc_model import KYCModel

class KYCController:
    @staticmethod
    def get_kyc_by_nik(nik: int):
        """
        Mengelola logika bisnis untuk mengambil data KYC berdasarkan NIK
        """
        kyc_data = KYCModel.get_by_nik(nik)
        if kyc_data is None:
            return None, "Terjadi kesalahan saat mengambil data dari database."
        if len(kyc_data) == 0:
            return [], f"Tidak ada data KYC untuk NIK {nik}."
        return kyc_data, "Data KYC berhasil diambil."
