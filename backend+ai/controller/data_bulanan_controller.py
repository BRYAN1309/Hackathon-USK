from model.data_bulanan_model import DataBulananModel

class DataBulananController:
    @staticmethod
    def get_data_bulanan_by_user_id(user_id: int):
        """
        Mengelola logika bisnis untuk mengambil data bulanan berdasarkan user_id
        """
        data_bulanan = DataBulananModel.get_by_user_id(user_id)
        if data_bulanan is None:
            return None, "Terjadi kesalahan saat mengambil data dari database."
        if len(data_bulanan) == 0:
            return [], f"Tidak ada data bulanan untuk user_id {user_id}."
        return data_bulanan, "Data bulanan berhasil diambil."
