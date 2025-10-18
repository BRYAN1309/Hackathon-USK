from model.kyc_model import KYCModel

class KYCController:
    @staticmethod
    def get_kyc_by_user_id(user_id: int):
        """
        Mengelola logika bisnis untuk mengambil data KYC berdasarkan user_id
        """
        kyc_data = KYCModel.get_by_user_id(user_id)
        if kyc_data is None:
            return None, "Terjadi kesalahan saat mengambil data dari database."
        if len(kyc_data) == 0:
            return [], f"Tidak ada data KYC untuk user_id {user_id}."
        return kyc_data, "Data KYC berhasil diambil."
