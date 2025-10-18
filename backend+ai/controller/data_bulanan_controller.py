from model.data_bulanan_model import DataBulananModel

class DataBulananController:
    @staticmethod
    def get_data_bulanan_by_nomor_rekening(nomor_rekening: int):
        """
        Mengelola logika bisnis untuk mengambil data bulanan berdasarkan nomor_rekening
        """
        data_bulanan = DataBulananModel.get_by_nomor_rekening(nomor_rekening)
        if data_bulanan is None:
            return None, "Terjadi kesalahan saat mengambil data dari database."
        if len(data_bulanan) == 0:
            return [], f"Tidak ada data bulanan untuk nomor rekening {nomor_rekening}."
        return data_bulanan, "Data bulanan berhasil diambil."
