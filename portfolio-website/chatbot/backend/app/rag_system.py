from langchain_community.document_loaders import PyPDFLoader
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
import os
import logging

class RAGSystem:
    """
    Retrieval-Augmented Generation system for retrieving context from documents.
    Currently supports PDF documents, specifically the resume.
    """
    def __init__(self, pdf_path=None):
        # Default to the resume in the public directory if no path is provided
        if pdf_path is None:
            # Try to find the resume in common locations
            possible_paths = [
                "./resume.pdf",
                "../public/resume.pdf",
                "../../public/resume.pdf",
                "../../../public/resume.pdf",
            ]
            
            for path in possible_paths:
                if os.path.exists(path):
                    pdf_path = path
                    break
            
            if pdf_path is None:
                raise FileNotFoundError("Resume PDF not found in common locations")
        
        try:
            # Load and process the PDF
            loader = PyPDFLoader(pdf_path)
            documents = loader.load()
            
            # Split documents into chunks
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=1000,
                chunk_overlap=200
            )
            splits = text_splitter.split_documents(documents)
            
            # Create embeddings and vector store
            embeddings = HuggingFaceEmbeddings()
            self.vector_store = FAISS.from_documents(splits, embeddings)
            
            logging.info(f"RAG system initialized with {len(splits)} document chunks")
        except Exception as e:
            logging.error(f"Error initializing RAG system: {e}")
            raise
    
    def get_context(self, query: str, k: int = 3) -> str:
        """
        Retrieve relevant context from the vector store based on the query.
        
        Args:
            query: The query to search for
            k: The number of documents to retrieve
            
        Returns:
            A string containing the concatenated content of the retrieved documents
        """
        try:
            docs = self.vector_store.similarity_search(query, k=k)
            context = "\n\n".join([doc.page_content for doc in docs])
            return context
        except Exception as e:
            logging.error(f"Error retrieving context: {e}")
            return ""